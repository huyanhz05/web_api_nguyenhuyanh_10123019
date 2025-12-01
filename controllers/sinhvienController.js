import { sinhvienRepo } from "../repositories/sinhvien.js" // Đảm bảo import đúng tên Repository

// ----------------------- 1. GET: Lấy Dữ liệu (CRUD và Tìm kiếm) ---------------------------

// Lấy tất cả sinh viên (GET /api/SinhVien)
export const getSinhVien = async (req, res) => {
    try {
        const sinhVienList = await sinhvienRepo.getSinhVien();
        res.status(200).json({ 
            status: 200, 
            message: "Lấy danh sách sinh viên thành công", 
            data: sinhVienList 
        });
    } catch (err) {
        console.error("Lỗi GET tất cả sinh viên:", err.message);
        res.status(500).json({ status: 500, message: "Lỗi Server nội bộ", error: err.message });
    }
};

// Lấy sinh viên theo mã (GET /api/SinhVien/:maSV)
export const getSinhVienByMa = async (req, res) => {
    try {
        const maSV = req.params.maSV;
        const sinhvien = await sinhvienRepo.getSinhVienByMa(maSV);

        if (!sinhvien) {
            return res.status(404).json({ status: 404, message: `Không tìm thấy sinh viên có mã ${maSV}!` });
        }
        res.status(200).json({ status: 200, data: sinhvien });
    } catch (err) {
        console.error(`Lỗi GET sinh viên ${req.params.maSV}:`, err.message);
        res.status(500).json({ status: 500, message: "Lỗi Server nội bộ", error: err.message });
    }
};

// Tìm sinh viên theo Địa chỉ (GET /api/SinhVien/search/diachi?diaChi=...)
export const getSinhVienByDiaChi = async (req, res) => {
    try {
        const diaChi = req.query.diaChi;
        if (!diaChi) {
            return res.status(400).json({ status: 400, message: "Thiếu tham số 'diaChi'." });
        }
        const sinhVienList = await sinhvienRepo.getSinhVienByDiaChi(diaChi);
        res.status(200).json({ status: 200, data: sinhVienList });
    } catch (err) {
        console.error("Lỗi tìm kiếm theo Địa chỉ:", err.message);
        res.status(500).json({ status: 500, message: "Lỗi Server nội bộ", error: err.message });
    }
};

// Tìm sinh viên theo Tên (GET /api/SinhVien/search/ten?tenSV=...)
export const getSinhVienByTen = async (req, res) => {
    try {
        const tenSV = req.query.tenSV;
        if (!tenSV) {
            return res.status(400).json({ status: 400, message: "Thiếu tham số 'tenSV'." });
        }
        const sinhVienList = await sinhvienRepo.getSinhVienByTen(tenSV);
        res.status(200).json({ status: 200, data: sinhVienList });
    } catch (err) {
        console.error("Lỗi tìm kiếm theo Tên:", err.message);
        res.status(500).json({ status: 500, message: "Lỗi Server nội bộ", error: err.message });
    }
};

// Tìm sinh viên trên 20 tuổi (GET /api/SinhVien/tuoi/tren20)
export const getSinhVienTren20Tuoi = async (req, res) => {
    try {
        const sinhVienList = await sinhvienRepo.getSinhVienTren20Tuoi();
        res.status(200).json({ status: 200, data: sinhVienList });
    } catch (err) {
        console.error("Lỗi tìm kiếm trên 20 tuổi:", err.message);
        res.status(500).json({ status: 500, message: "Lỗi Server nội bộ", error: err.message });
    }
};

// ----------------------- 2. POST: Thêm Dữ liệu ---------------------------

// Thêm sinh viên mới (POST /api/SinhVien)
export const createSinhVien = async (req, res) => {
    try {
        const sinhvienMoi = req.body;
        
        // Kiểm tra tối thiểu: phải có MaSV và TenSV
        if (!sinhvienMoi.MaSV || !sinhvienMoi.TenSV) {
            return res.status(400).json({ status: 400, message: "Thiếu mã hoặc tên sinh viên." });
        }

        const result = await sinhvienRepo.createSinhVien(sinhvienMoi);
        
        res.status(201).json({ 
            status: 201, 
            message: "Thêm sinh viên thành công!",
            data: { MaSV: sinhvienMoi.MaSV, insertId: result.insertId }
        });
    } catch (err) {
        // Lỗi 409 (Conflict) nếu MaSV đã tồn tại (PRIMARY KEY)
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ status: 409, message: `Mã sinh viên ${req.body.MaSV} đã tồn tại.` });
        }
        console.error("Lỗi POST sinh viên:", err.message);
        res.status(500).json({ status: 500, message: "Lỗi Server nội bộ", error: err.message });
    }
};

// ----------------------- 3. PUT: Sửa Dữ liệu ---------------------------

// Cập nhật thông tin sinh viên theo mã (PUT /api/SinhVien/:maSV)
export const updateSinhVien = async (req, res) => {
    try {
        const maSV = req.params.maSV;
        const sinhvienData = req.body;
        
        const result = await sinhvienRepo.updateSinhVien(maSV, sinhvienData);

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 404, message: `Không tìm thấy sinh viên có mã ${maSV} để cập nhật.` });
        }
        
        res.status(200).json({ status: 200, message: `Cập nhật sinh viên ${maSV} thành công`, data: sinhvienData });
    } catch (err) {
        console.error(`Lỗi PUT sinh viên ${req.params.maSV}:`, err.message);
        res.status(500).json({ status: 500, message: "Lỗi Server nội bộ", error: err.message });
    }
};

// ----------------------- 4. DELETE: Xóa Dữ liệu ---------------------------

// Xóa sinh viên theo mã (DELETE /api/SinhVien/:maSV)
export const deleteSinhVien = async (req, res) => {
    try {
        const maSV = req.params.maSV;
        const result = await sinhvienRepo.deleteSinhVien(maSV);

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 404, message: `Không tìm thấy sinh viên có mã ${maSV} để xóa.` });
        }
        
        res.status(200).json({ status: 200, message: `Xóa sinh viên ${maSV} thành công` });
    } catch (err) {
        console.error(`Lỗi DELETE sinh viên ${req.params.maSV}:`, err.message);
        res.status(500).json({ status: 500, message: "Lỗi Server nội bộ", error: err.message });
    }
};