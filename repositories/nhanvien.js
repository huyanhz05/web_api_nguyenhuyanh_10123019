import { pool } from "../services/mysql.js";

export const nhanvienRepo = {
   // repositories/nhanvien.js - Sửa hàm getnhanvien

getnhanvien: async () => {
    const db = await pool;
    const [rows] = await db.query(
        // Dùng DATE_FORMAT để định dạng đầu ra chỉ là YYYY-MM-DD
        "SELECT maNV, TenNV, GioiTinh, DATE_FORMAT(NgaySinh, '%Y-%m-%d') AS NgaySinh, email, SDT FROM NHANVIEN"
    );
    return rows;
},

    // 2. GET BY ID: Lấy nhân viên theo mã (maNV)
    getNhanVienByMa: async (maNV) => {
        const db = await pool;
        const [rows] = await db.query("SELECT * FROM NHANVIEN WHERE maNV = ?", [maNV]);
        // Trả về đối tượng đầu tiên (vì maNV là Primary Key)
        return rows[0]; 
    },

    // 3. POST: Thêm nhân viên mới
    createNhanVien: async (nhanvien) => {
        const db = await pool;
        const [result] = await db.query(
            "INSERT INTO NHANVIEN (maNV, TenNV, GioiTinh, NgaySinh, email, SDT) VALUES (?, ?, ?, ?, ?, ?)",
            [nhanvien.maNV, nhanvien.TenNV, nhanvien.GioiTinh, nhanvien.NgaySinh, nhanvien.email, nhanvien.SDT]
        );
        return result; // Chứa insertId và affectedRows
    },

    // 4. PUT/PATCH: Cập nhật thông tin nhân viên theo mã
    updateNhanVien: async (maNV, nhanvien) => {
        const db = await pool;
        const [result] = await db.query(
            "UPDATE NHANVIEN SET TenNV = ?, GioiTinh = ?, NgaySinh = ?, email = ?, SDT = ? WHERE maNV = ?",
            [nhanvien.TenNV, nhanvien.GioiTinh, nhanvien.NgaySinh, nhanvien.email, nhanvien.SDT, maNV]
        );
        return result; // Chứa affectedRows (số dòng bị ảnh hưởng)
    },

    // 5. DELETE: Xóa nhân viên theo mã
    deleteNhanVien: async (maNV) => {
        const db = await pool;
        const [result] = await db.query(
            "DELETE FROM NHANVIEN WHERE maNV = ?",
            [maNV]
        );
        return result; // Chứa affectedRows
    }
};



