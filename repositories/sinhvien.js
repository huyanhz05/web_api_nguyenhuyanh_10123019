import { pool } from "../services/mysql.js";

export const sinhvienRepo = {
    // ----------------------- 1. CRUD Cơ bản ---------------------------

    // 1. GET ALL: Lấy tất cả sinh viên
    getSinhVien: async () => {
        const db = await pool;
        const [rows] = await db.query(
            // Định dạng NgaySinh ra YYYY-MM-DD
            "SELECT MaSV, TenSV, GioiTinh, DiaChi, DATE_FORMAT(NgaySinh, '%Y-%m-%d') AS NgaySinh FROM SinhVien"
        );
        return rows;
    },

    // 2. GET BY ID: Lấy sinh viên theo mã (MaSV)
    getSinhVienByMa: async (maSV) => {
        const db = await pool;
        const [rows] = await db.query("SELECT * FROM SinhVien WHERE MaSV = ?", [maSV]);
        return rows[0]; // Trả về đối tượng đầu tiên
    },

    // 3. POST: Thêm sinh viên mới
    createSinhVien: async (sinhvien) => {
        const db = await pool;
        const [result] = await db.query(
            "INSERT INTO SinhVien (MaSV, TenSV, GioiTinh, DiaChi, NgaySinh) VALUES (?, ?, ?, ?, ?)",
            [sinhvien.MaSV, sinhvien.TenSV, sinhvien.GioiTinh, sinhvien.DiaChi, sinhvien.NgaySinh]
        );
        return result;
    },

    // 4. PUT/PATCH: Cập nhật thông tin sinh viên theo mã
    updateSinhVien: async (maSV, sinhvien) => {
        const db = await pool;
        const [result] = await db.query(
            "UPDATE SinhVien SET TenSV = ?, GioiTinh = ?, DiaChi = ?, NgaySinh = ? WHERE MaSV = ?",
            [sinhvien.TenSV, sinhvien.GioiTinh, sinhvien.DiaChi, sinhvien.NgaySinh, maSV]
        );
        return result;
    },

    // 5. DELETE: Xóa sinh viên theo mã
    deleteSinhVien: async (maSV) => {
        const db = await pool;
        const [result] = await db.query(
            "DELETE FROM SinhVien WHERE MaSV = ?",
            [maSV]
        );
        return result;
    },

    // ----------------------- 2. Các Hàm Tìm Kiếm Nâng Cao ---------------------------

    // 6. Tìm sinh viên có địa chỉ chứa tham số DiaChi
    getSinhVienByDiaChi: async (diaChi) => {
        const db = await pool;
        // Sử dụng CONCAT('%', ?, '%') để tìm kiếm chuỗi con (LIKE %value%)
        const [rows] = await db.query(
            "SELECT * FROM SinhVien WHERE DiaChi LIKE CONCAT('%', ?, '%')", 
            [diaChi]
        );
        return rows;
    },

    // 7. Tìm sinh viên có tên chứa tham số TenSV
    getSinhVienByTen: async (tenSV) => {
        const db = await pool;
        const [rows] = await db.query(
            "SELECT * FROM SinhVien WHERE TenSV LIKE CONCAT('%', ?, '%')", 
            [tenSV]
        );
        return rows;
    },

    // 8. Tìm sinh viên trên 20 tuổi
    getSinhVienTren20Tuoi: async () => {
        const db = await pool;
        // DATEDIFF(CURDATE(), NgaySinh) tính số ngày chênh lệch. Chia cho 365.25 để lấy số năm tuổi.
        const [rows] = await db.query(
            "SELECT * FROM SinhVien WHERE (DATEDIFF(CURDATE(), NgaySinh) / 365.25) >= 20"
        );
        return rows;
    }
};