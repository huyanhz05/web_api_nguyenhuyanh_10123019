// Thay đổi import từ nhanvien.js sang loaixe.js (Giả sử file repository đã được đổi tên)
import { loaixeRepo } from "../repositories/loaixe.js";

// ----------------------- GET: Lấy Dữ liệu ---------------------------

/**
 * Lấy tất cả loại xe
 * GET /api/loaixe
 */
export const getLoaiXe = async (req, res) => {
    try {
        // Gọi hàm getLoaiXe từ repository
        const loaixeList = await loaixeRepo.getLoaiXe();
        res.status(200).json({ 
            status: 200, 
            message: "Lấy danh sách loại xe thành công", 
            data: loaixeList 
        });
    } catch (err) {
        console.error("Lỗi GET tất cả loại xe:", err.message);
        res.status(500).json({ status: 500, message: "Lỗi Server nội bộ", error: err.message });
    }
};

/**
 * Lấy loại xe theo mã (MaLoaiXe)
 * GET /api/loaixe/:MaLoaiXe
 */
export const getLoaiXeByMa = async (req, res) => {
    try {
        const MaLoaiXe = req.params.MaLoaiXe;
        // Gọi hàm getNhanVienByMa thành getLoaiXeByMa
        const loaixe = await loaixeRepo.getLoaiXeByMa(MaLoaiXe);

        if (!loaixe) {
            return res.status(404).json({ status: 404, message: `Không tìm thấy loại xe có mã ${MaLoaiXe}!` });
        }
        res.status(200).json({ status: 200, data: loaixe });
    } catch (err) {
        console.error(`Lỗi GET loại xe ${req.params.MaLoaiXe}:`, err.message);
        res.status(500).json({ status: 500, message: "Lỗi Server nội bộ", error: err.message });
    }
};

// ----------------------- POST: Thêm Dữ liệu ---------------------------

/**
 * Thêm loại xe mới (POST)
 * POST /api/loaixe
 */
export const createLoaiXe = async (req, res) => {
    try {
        const loaixeMoi = req.body;
        
        // Kiểm tra tối thiểu: phải có MaLoaiXe và TenLoaiXe
        if (!loaixeMoi.MaLoaiXe || !loaixeMoi.TenLoaiXe || !loaixeMoi.GiaVeTheoGio) {
            return res.status(400).json({ status: 400, message: "Thiếu mã, tên loại xe hoặc giá vé." });
        }

        // Gọi hàm createNhanVien thành createLoaiXe
        const result = await loaixeRepo.createLoaiXe(loaixeMoi);
        
        res.status(201).json({ 
            status: 201, 
            message: "Thêm loại xe thành công!",
            data: { MaLoaiXe: loaixeMoi.MaLoaiXe, insertId: result.insertId }
        });
    } catch (err) {
        // Lỗi 409 (Conflict) nếu MaLoaiXe đã tồn tại (PRIMARY KEY)
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ status: 409, message: `Mã loại xe ${req.body.MaLoaiXe} đã tồn tại.` });
        }
        console.error("Lỗi POST loại xe:", err.message);
        res.status(500).json({ status: 500, message: "Lỗi Server nội bộ", error: err.message });
    }
};

// ----------------------- PUT: Sửa Dữ liệu ---------------------------

/**
 * Cập nhật thông tin loại xe theo mã (PUT)
 * PUT /api/loaixe/:MaLoaiXe
 */
export const updateLoaiXe = async (req, res) => {
    try {
        const MaLoaiXe = req.params.MaLoaiXe;
        const loaixeData = req.body;
        
        // Gọi hàm updateNhanVien thành updateLoaiXe
        const result = await loaixeRepo.updateLoaiXe(MaLoaiXe, loaixeData);

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 404, message: `Không tìm thấy loại xe có mã ${MaLoaiXe} để cập nhật.` });
        }
        
        res.status(200).json({ status: 200, message: `Cập nhật loại xe ${MaLoaiXe} thành công`, data: loaixeData });
    } catch (err) {
        console.error(`Lỗi PUT loại xe ${req.params.MaLoaiXe}:`, err.message);
        res.status(500).json({ status: 500, message: "Lỗi Server nội bộ", error: err.message });
    }
};

// ----------------------- DELETE: Xóa Dữ liệu ---------------------------

/**
 * Xóa loại xe theo mã (DELETE)
 * DELETE /api/loaixe/:MaLoaiXe
 */
export const deleteLoaiXe = async (req, res) => {
    try {
        const MaLoaiXe = req.params.MaLoaiXe;
        // Gọi hàm deleteNhanVien thành deleteLoaiXe
        const result = await loaixeRepo.deleteLoaiXe(MaLoaiXe);

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 404, message: `Không tìm thấy loại xe có mã ${MaLoaiXe} để xóa.` });
        }
        
        res.status(200).json({ status: 200, message: `Xóa loại xe ${MaLoaiXe} thành công` });
    } catch (err) {
        // Thêm xử lý lỗi nếu loại xe đang được tham chiếu (khóa ngoại)
        if (err.code === 'ER_ROW_IS_REFERENCED_2') {
             return res.status(409).json({ status: 409, message: `Không thể xóa loại xe ${MaLoaiXe} do đang có xe hoặc lịch sử giao dịch tham chiếu đến.` });
        }
        console.error(`Lỗi DELETE loại xe ${req.params.MaLoaiXe}:`, err.message);
        res.status(500).json({ status: 500, message: "Lỗi Server nội bộ", error: err.message });
    }
};