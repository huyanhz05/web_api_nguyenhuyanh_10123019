import { pool } from "../services/mysql.js";
export const nhasachRepo = {
    // 1. GET ALL: Lấy tất cả Nhà sách
    getnhasach: async () => {
        const db = await pool;
        const [rows] = await db.query(
            // Sửa bảng từ NHANVIEN sang NHASACH và các cột liên quan
            "SELECT MaS, TenNS, DiaChi, SDT, Email FROM NHASACH"
        );
        return rows;
    },

    // 2. GET BY ID: Lấy Nhà sách theo mã (MaS)
    getnhasachByMa: async (maS) => { // Sửa tên hàm và tham số
        const db = await pool;
        // Sửa bảng và khóa chính từ maNV sang MaS
        const [rows] = await db.query("SELECT * FROM NHASACH WHERE MaS = ?", [maS]);
        // Trả về đối tượng đầu tiên (vì MaS là Primary Key)
        return rows[0]; 
    },

    // 3. POST: Thêm Nhà sách mới
    createnhasach: async (nhasach) => { // Sửa tên hàm
        const db = await pool;
        const [result] = await db.query(
            // Sửa tên bảng và tên cột
            "INSERT INTO NHASACH (MaS, TenNS, DiaChi, SDT, Email) VALUES (?, ?, ?, ?, ?)",
            [nhasach.MaS, nhasach.TenNS, nhasach.DiaChi, nhasach.SDT, nhasach.Email]
        );
        return result; // Chứa insertId và affectedRows
    },

    // 4. PUT/PATCH: Cập nhật thông tin Nhà sách theo mã
    updatenhasach: async (maS, nhasach) => { // Sửa tên hàm và tham số
        const db = await pool;
        const [result] = await db.query(
            // Sửa tên bảng, tên cột và khóa chính
            "UPDATE NHASACH SET TenNS = ?, DiaChi = ?, SDT = ?, Email = ? WHERE MaS = ?",
            [nhasach.TenNS, nhasach.DiaChi, nhasach.SDT, nhasach.Email, maS]
        );
        return result; // Chứa affectedRows (số dòng bị ảnh hưởng)
    },

    // 5. DELETE: Xóa Nhà sách theo mã
    deletenhasach: async (maS) => { // Sửa tên hàm và tham số
        const db = await pool;
        const [result] = await db.query(
            // Sửa tên bảng và khóa chính
            "DELETE FROM NHASACH WHERE MaS = ?",
            [maS]
        );
        return result; // Chứa affectedRows
    }
};