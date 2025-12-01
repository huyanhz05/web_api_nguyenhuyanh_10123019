import { nhanvienRepo } from "../repositories/nhanvien.js";

// ----------------------- GET: Lấy Dữ liệu ---------------------------

// Lấy tất cả nhân viên
export const getnhanvien = async (req, res) => {
    try {
        const nhanvienList = await nhanvienRepo.getnhanvien(); // Hàm này lấy tất cả
        res.status(200).json({ 
            status: 200, 
            message: "Lấy danh sách nhân viên thành công", 
            data: nhanvienList 
        });
    } catch (err) {
        console.error("Lỗi GET tất cả nhân viên:", err.message);
        res.status(500).json({ status: 500, message: "Lỗi Server nội bộ", error: err.message });
    }
};
// Lấy nhân viên theo mã (maNV)
export const getNhanVienByMa = async (req, res) => {
    try {
        const maNV = req.params.maNV;
        const nhanvien = await nhanvienRepo.getNhanVienByMa(maNV); // Hàm Repo cần được định nghĩa

        if (!nhanvien) {
            return res.status(404).json({ status: 404, message: `Không tìm thấy nhân viên có mã ${maNV}!` });
        }
        res.status(200).json({ status: 200, data: nhanvien });
    } catch (err) {
        console.error(`Lỗi GET nhân viên ${req.params.maNV}:`, err.message);
        res.status(500).json({ status: 500, message: "Lỗi Server nội bộ", error: err.message });
    }
};

// ----------------------- POST: Thêm Dữ liệu ---------------------------

// Thêm nhân viên mới (POST)
export const createNhanVien = async (req, res) => {
    try {
        const nhanvienMoi = req.body;
        
        // Kiểm tra tối thiểu: phải có maNV và TenNV
        if (!nhanvienMoi.maNV || !nhanvienMoi.TenNV) {
            return res.status(400).json({ status: 400, message: "Thiếu mã hoặc tên nhân viên." });
        }

        const result = await nhanvienRepo.createNhanVien(nhanvienMoi); // Hàm Repo cần được định nghĩa
        
        res.status(201).json({ 
            status: 201, 
            message: "Thêm nhân viên thành công!",
            data: { maNV: nhanvienMoi.maNV, insertId: result.insertId }
        });
    } catch (err) {
        // Lỗi 409 (Conflict) nếu maNV đã tồn tại (PRIMARY KEY)
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ status: 409, message: `Mã nhân viên ${req.body.maNV} đã tồn tại.` });
        }
        console.error("Lỗi POST nhân viên:", err.message);
        res.status(500).json({ status: 500, message: "Lỗi Server nội bộ", error: err.message });
    }
};

// ----------------------- PUT: Sửa Dữ liệu ---------------------------

// Cập nhật thông tin nhân viên theo mã (PUT)
export const updateNhanVien = async (req, res) => {
    try {
        const maNV = req.params.maNV;
        const nhanvienData = req.body;
        
        const result = await nhanvienRepo.updateNhanVien(maNV, nhanvienData); // Hàm Repo cần được định nghĩa

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 404, message: `Không tìm thấy nhân viên có mã ${maNV} để cập nhật.` });
        }
        
        res.status(200).json({ status: 200, message: `Cập nhật nhân viên ${maNV} thành công`, data: nhanvienData });
    } catch (err) {
        console.error(`Lỗi PUT nhân viên ${req.params.maNV}:`, err.message);
        res.status(500).json({ status: 500, message: "Lỗi Server nội bộ", error: err.message });
    }
};

// ----------------------- DELETE: Xóa Dữ liệu ---------------------------

// Xóa nhân viên theo mã (DELETE)
export const deleteNhanVien = async (req, res) => {
    try {
        const maNV = req.params.maNV;
        const result = await nhanvienRepo.deleteNhanVien(maNV); // Hàm Repo cần được định nghĩa

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 404, message: `Không tìm thấy nhân viên có mã ${maNV} để xóa.` });
        }
        
        res.status(200).json({ status: 200, message: `Xóa nhân viên ${maNV} thành công` });
    } catch (err) {
        console.error(`Lỗi DELETE nhân viên ${req.params.maNV}:`, err.message);
        res.status(500).json({ status: 500, message: "Lỗi Server nội bộ", error: err.message });
    }
};