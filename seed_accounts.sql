-- Seed test accounts for the current PHP login system.
-- Run this in Supabase SQL Editor after supabase_schema.sql.
-- Change the passwords before using these accounts in production.

DO $$
BEGIN
    IF to_regclass('public.users') IS NULL THEN
        RAISE EXCEPTION 'Table public.users does not exist. Run supabase_schema.sql first.';
    END IF;
END $$;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

BEGIN;

-- Admin account
-- Username: admin
-- Password: Admin@123456
INSERT INTO users (username, password, role)
VALUES (
    'admin',
    crypt('Admin@123456', gen_salt('bf', 12)),
    'admin'
)
ON CONFLICT (username) DO UPDATE
SET password = EXCLUDED.password,
    role = EXCLUDED.role;

-- Driver account
-- Username: driver01
-- Password: ChangeThisDriverPassword!2026
DO $$
DECLARE
    driver_user_id INTEGER;
    driver_id_value VARCHAR(20) := 'DR-0001';
    vehicle_id_value INTEGER;
BEGIN
    INSERT INTO users (username, password, role)
    VALUES (
        'driver01',
        crypt('ChangeThisDriverPassword!2026', gen_salt('bf', 12)),
        'driver'
    )
    ON CONFLICT (username) DO UPDATE
    SET password = EXCLUDED.password,
        role = EXCLUDED.role;

    SELECT id INTO driver_user_id
    FROM users
    WHERE username = 'driver01' AND role = 'driver';

    INSERT INTO drivers (
        driver_id, user_id, full_name, address, contact, birthdate,
        gender, vehicle_type, plate_number, license_no, photo,
        status, license_expiration
    )
    VALUES (
        driver_id_value, driver_user_id, 'Test Driver', 'Borongan City',
        '09170000000', DATE '1990-01-01', 'Male', 'Tricycle',
        'TEST-0001', 'TEST-LICENSE-0001', NULL,
        'Active', CURRENT_DATE + INTERVAL '1 year'
    )
    ON CONFLICT (driver_id) DO NOTHING;

    INSERT INTO vehicles (plate_number, vehicle_type, driver_id, status)
    VALUES ('TEST-0001', 'Tricycle', driver_id_value, 'Active')
    ON CONFLICT (plate_number) DO NOTHING;

    SELECT vehicle_id INTO vehicle_id_value
    FROM vehicles
    WHERE plate_number = 'TEST-0001';

    INSERT INTO qr_codes (driver_id, vehicle_id, qr_data, status)
    VALUES (
        driver_id_value,
        vehicle_id_value,
        json_build_object(
            'version', 1,
            'driverId', driver_id_value,
            'plateNumber', 'TEST-0001',
            'vehicleType', 'Tricycle'
        )::TEXT,
        'Active'
    )
    ON CONFLICT (driver_id) DO NOTHING;

    INSERT INTO activities (action, details, badge_class)
    VALUES ('Seeded Driver', 'Created driver01 test account.', 'added');
END $$;

COMMIT;
