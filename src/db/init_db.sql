-- Kiểm tra và drop Database nếu nó đã tồn tại
DROP DATABASE IF EXISTS ia04;

-- Tạo Database mới
CREATE DATABASE ia04;

-- Chuyển tới Database mới
\c ia04;

-- Kiểm tra và drop bảng nếu nó đã tồn tại
DROP TABLE IF EXISTS "user";

-- Tạo bảng User mới
CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(255) UNIQUE NOT NULL,
  "fullName" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "avatar" VARCHAR(255),
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);