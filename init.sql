-- สร้าง database ถ้ายังไม่มี
CREATE DATABASE IF NOT EXISTS myapp;

-- สร้าง user ถ้ายังไม่มี
CREATE USER IF NOT EXISTS 'appuser' @'%' IDENTIFIED BY 'apppassword';

-- ให้สิทธิ์ทั้งหมดแก่ appuser บน database myapp
GRANT ALL PRIVILEGES ON myapp.* TO 'appuser' @'%';

-- โหลดสิทธิ์ใหม่เข้า system
FLUSH PRIVILEGES;