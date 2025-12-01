import { nhasachRepo } from "../repositories/nhasach.js"; // Đổi import thành nhasachRepo

// ----------------------- GET: Lấy Dữ liệu ---------------------------

// Lấy tất cả nhà sách
export const getnhasach = async (req, res) => { // Đổi tên hàm
    try {
        const nhasachList = await nhasachRepo.getnhasach(); // Gọi hàm Repo tương ứng
        res.status(200).json({ 
            status: 200, 
            message: "Lấy danh sách nhà sách thành công", 
            data: nhasachList 
        });
    } catch (err) {
        console.error("Lỗi GET tất cả nhà sách:", err.message);
        res.status(500).json({ status: 500, message: "Lỗi Server nội bộ", error: err.message });
    }
};

// Lấy nhà sách theo mã (MaS)
export const getnhasachByMa = async (req, res) => { // Đổi tên hàm
    try {
        const maS = req.params.maS; // Đổi tham số thành maS
        const nhasach = await nhasachRepo.getnhasachByMa(maS); // Gọi hàm Repo tương ứng

        if (!nhasach) {
            return res.status(404).json({ status: 404, message: `Không tìm thấy nhà sách có mã ${maS}!` });
        }
        res.status(200).json({ status: 200, data: nhasach });
    } catch (err) {
        console.error(`Lỗi GET nhà sách ${req.params.maS}:`, err.message);
        res.status(500).json({ status: 500, message: "Lỗi Server nội bộ", error: err.message });
    }
};

// ----------------------- POST: Thêm Dữ liệu ---------------------------

// Thêm nhà sách mới (POST)
export const createnhasach = async (req, res) => { // Đổi tên hàm
    try {
        const nhasachMoi = req.body;
        
        // Kiểm tra tối thiểu: phải có MaS và TenNS
        if (!nhasachMoi.MaS || !nhasachMoi.TenNS) {
            return res.status(400).json({ status: 400, message: "Thiếu mã hoặc tên nhà sách." });
        }

        const result = await nhasachRepo.createnhasach(nhasachMoi); // Gọi hàm Repo tương ứng
        
        res.status(201).json({ 
            status: 201, 
            message: "Thêm nhà sách thành công!",
            data: { MaS: nhasachMoi.MaS, insertId: result.insertId } // Sửa maNV thành MaS
        });
    } catch (err) {
        // Lỗi 409 (Conflict) nếu MaS đã tồn tại (PRIMARY KEY)
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ status: 409, message: `Mã nhà sách ${req.body.MaS} đã tồn tại.` });
        }
        console.error("Lỗi POST nhà sách:", err.message);
        res.status(500).json({ status: 500, message: "Lỗi Server nội bộ", error: err.message });
    }
};

// ----------------------- PUT: Sửa Dữ liệu ---------------------------

// Cập nhật thông tin nhà sách theo mã (PUT)
export const updatenhasach = async (req, res) => { // Đổi tên hàm
    try {
        const maS = req.params.maS; // Đổi tham số thành maS
        const nhasachData = req.body;
        
        const result = await nhasachRepo.updatenhasach(maS, nhasachData); // Gọi hàm Repo tương ứng

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 404, message: `Không tìm thấy nhà sách có mã ${maS} để cập nhật.` });
        }
        
        res.status(200).json({ status: 200, message: `Cập nhật nhà sách ${maS} thành công`, data: nhasachData });
    } catch (err) {
        console.error(`Lỗi PUT nhà sách ${req.params.maS}:`, err.message);
        res.status(500).json({ status: 500, message: "Lỗi Server nội bộ", error: err.message });
    }
};

// ----------------------- DELETE: Xóa Dữ liệu ---------------------------

// Xóa nhà sách theo mã (DELETE)
export const deletenhasach = async (req, res) => { // Đổi tên hàm
    try {
        const maS = req.params.maS; // Đổi tham số thành maS
        const result = await nhasachRepo.deletenhasach(maS); // Gọi hàm Repo tương ứng

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 404, message: `Không tìm thấy nhà sách có mã ${maS} để xóa.` });
        }
        
        res.status(200).json({ status: 200, message: `Xóa nhà sách ${maS} thành công` });
    } catch (err) {
        console.error(`Lỗi DELETE nhà sách ${req.params.maS}:`, err.message);
        res.status(500).json({ status: 500, message: "Lỗi Server nội bộ", error: err.message });
    }
};