import { pool } from "../services/mysql.js";

// Đổi tên biến xuất khẩu thành loaixeRepo
export const loaixeRepo = {

    // 1. GET ALL: Lấy tất cả loại xe
    getLoaiXe: async () => {
        const db = await pool;
        const [rows] = await db.query(
            "SELECT MaLoaiXe, TenLoaiXe, GiaVeTheoGio FROM LOAI_XE"
        );
        return rows;
    },

    // 2. GET BY ID: Lấy loại xe theo mã (MaLoaiXe)
    getLoaiXeByMa: async (MaLoaiXe) => {
        const db = await pool;
        const [rows] = await db.query("SELECT * FROM LOAI_XE WHERE MaLoaiXe = ?", [MaLoaiXe]);
        // Trả về đối tượng đầu tiên (vì MaLoaiXe là Primary Key)
        return rows[0];
    },

    // 3. POST: Thêm loại xe mới
    createLoaiXe: async (loaixe) => {
        const db = await pool;
        const [result] = await db.query(
            "INSERT INTO LOAI_XE (MaLoaiXe, TenLoaiXe, GiaVeTheoGio) VALUES (?, ?, ?)",
            [loaixe.MaLoaiXe, loaixe.TenLoaiXe, loaixe.GiaVeTheoGio]
        );
        return result; // Chứa insertId và affectedRows
    },

    // 4. PUT/PATCH: Cập nhật thông tin loại xe theo mã
    updateLoaiXe: async (MaLoaiXe, loaixe) => {
        const db = await pool;
        const [result] = await db.query(
            "UPDATE LOAI_XE SET TenLoaiXe = ?, GiaVeTheoGio = ? WHERE MaLoaiXe = ?",
            [loaixe.TenLoaiXe, loaixe.GiaVeTheoGio, MaLoaiXe]
        );
        return result; // Chứa affectedRows (số dòng bị ảnh hưởng)
    },

    // 5. DELETE: Xóa loại xe theo mã
    deleteLoaiXe: async (MaLoaiXe) => {
        const db = await pool;
        const [result] = await db.query(
            "DELETE FROM LOAI_XE WHERE MaLoaiXe = ?",
            [MaLoaiXe]
        );
        return result; // Chứa affectedRows
    }
};