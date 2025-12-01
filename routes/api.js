import express from "express";

// Import các hàm xử lý CRUD cho NHANVIEN
import { 
    getnhanvien, 
    getNhanVienByMa,
    createNhanVien, 
    updateNhanVien, 
    deleteNhanVien
} from "../controllers/nhanvienController.js"; 

// Import các hàm xử lý CRUD cho NHASACH 
import { 
    getnhasach, 
    getnhasachByMa, 
    createnhasach, 
    updatenhasach, 
    deletenhasach
} from "../controllers/nhasachController.js"; 

// 🆕 Import các hàm xử lý cho SINHVIEN
import { 
    getSinhVien,
    getSinhVienByMa,
    createSinhVien,
    updateSinhVien,
    deleteSinhVien,
    getSinhVienByDiaChi,
    getSinhVienByTen,
    getSinhVienTren20Tuoi
} from "../controllers/sinhvienController.js"; 
import { 
    getLoaiXe,
    getLoaiXeByMa,
    createLoaiXe,
    updateLoaiXe,
    deleteLoaiXe
} from "../controllers/loaixeController.js";
const router = express.Router();

// Route cơ bản cho API
router.get("/", (req, res) => {
    res.json({ message: "Welcome to API route" });
});

// ----------------------- 👤 NHANVIEN Routes ---------------------------
// ... (Các route NHANVIEN giữ nguyên) ...
router.get("/nhanvien", getnhanvien); 
router.get("/nhanvien/:maNV", getNhanVienByMa); 
router.post("/nhanvien", createNhanVien); 
router.put("/nhanvien/:maNV", updateNhanVien); 
router.delete("/nhanvien/:maNV", deleteNhanVien); 

// ----------------------- 📚 NHASACH Routes ---------------------------
// ... (Các route NHASACH giữ nguyên) ...
router.get("/nhasach", getnhasach); 
router.get("/nhasach/:maS", getnhasachByMa); 
router.post("/nhasach", createnhasach); 
router.put("/nhasach/:maS", updatenhasach); 
router.delete("/nhasach/:maS", deletenhasach); 

// ----------------------- 🧑‍🎓 SINHVIEN Routes ---------------------------

// CRUD Cơ bản
// Route: GET /api/sinhvien (Lấy tất cả)
router.get("/sinhvien", getSinhVien); 
// Route: GET /api/sinhvien/:maSV (Lấy theo mã)
router.get("/sinhvien/:maSV", getSinhVienByMa); 
// Route: POST /api/sinhvien (Thêm mới)
router.post("/sinhvien", createSinhVien); 
// Route: PUT /api/sinhvien/:maSV (Cập nhật)
router.put("/sinhvien/:maSV", updateSinhVien); 
// Route: DELETE /api/sinhvien/:maSV (Xóa)
router.delete("/sinhvien/:maSV", deleteSinhVien); 

// Tìm kiếm Nâng cao
// Route: GET /api/sinhvien/search/diachi?diaChi=...
router.get("/sinhvien/search/diachi", getSinhVienByDiaChi); 
// Route: GET /api/sinhvien/search/ten?tenSV=...
router.get("/sinhvien/search/ten", getSinhVienByTen); 
// Route: GET /api/sinhvien/tuoi/tren20 (Sinh viên trên 20 tuổi)
router.get("/sinhvien/tuoi/tren20", getSinhVienTren20Tuoi); 
// tìm kiếm 
////
// Route: GET /api/loaixe (Lấy tất cả)
router.get("/loaixe", getLoaiXe); 
// Route: GET /api/loaixe/:MaLoaiXe (Lấy theo mã)
router.get("/loaixe/:MaLoaiXe", getLoaiXeByMa); 
// Route: POST /api/loaixe (Thêm mới)
router.post("/loaixe", createLoaiXe); 
// Route: PUT /api/loaixe/:MaLoaiXe (Cập nhật)
router.put("/loaixe/:MaLoaiXe", updateLoaiXe); 
// Route: DELETE /api/loaixe/:MaLoaiXe (Xóa)
router.delete("/loaixe/:MaLoaiXe", deleteLoaiXe);
export default router;
