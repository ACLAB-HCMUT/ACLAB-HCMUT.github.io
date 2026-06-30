---
sidebar_position: 4
title: EMI / EMC
---

# EMI / EMC

**EMI** = nhiễu điện từ (mức nhiễu mà bo *phát ra* hoặc *thu vào*). **EMC** = tương thích điện từ
(bo vừa *hoạt động đúng* vừa *chịu được* môi trường). Sản phẩm phải đạt kiểm tra EMC mới được bán —
và ngay cả nguyên mẫu trượt EMC cũng thường tự gây nhiễu chính nó.

## Mô hình: nguồn → ghép → nạn nhân

Khắc phục EMI bằng cách phá vỡ bất kỳ mắt xích nào trong chuỗi:

- **Nguồn** — bộ ổn áp đóng cắt, clock/sườn nhanh, vòng dòng.
- **Ghép** — bức xạ (ăng-ten: vòng & stub) hoặc dẫn truyền (qua cáp/nguồn).
- **Nạn nhân** — analog nhạy cảm, chính clock của bo, hoặc thiết bị khác.

## Giảm phát xạ tại nguồn

- **Thu nhỏ vòng dòng** — vòng nhỏ phát xạ ít hơn nhiều (chủ yếu là việc của
  [đường hồi tiếp](/docs/pcb-design/fundamentals/return-paths-and-grounding)).
- **Làm chậm sườn** ở những chỗ không cần nhanh (điện trở gate/series) — sườn nhanh = nhiều năng
  lượng tần số cao.
- Giữ vòng nóng của **bộ ổn áp đóng cắt** nhỏ và cục bộ.

## Chặn ghép nhiễu

- **Mặt đất liền** và đường hồi tiếp liên tục (không cắt mặt phẳng dưới net nhanh).
- **Lọc** nhiễu dẫn truyền trên cáp/nguồn: ferrite, common-mode choke, π-filter.
- **Che chắn (shield)** ở nơi cần (chụp che RF, cáp có vỏ); nối đất vỏ shield đúng cách.
- Bảo vệ I/O và đầu nối bằng linh kiện **TVS/ESD** và khâu đất.

## Bảo vệ nạn nhân (miễn nhiễm)

- Bảo vệ ESD trên mọi chân hở ra ngoài.
- Lọc và nối đất tốt cho các đầu vào analog nhạy cảm.

## Danh sách kiểm tra Design-for-EMC

- [ ] Vòng dòng nhỏ; mặt phẳng hồi tiếp liền
- [ ] Không có đường nhanh nào cắt qua vết cắt mặt phẳng
- [ ] Vòng bộ ổn áp đóng cắt chặt và được đất che chắn
- [ ] Tốc độ sườn chỉ nhanh khi cần
- [ ] Lọc + ESD trên mọi cáp/đầu nối
- [ ] Clock định tuyến ngắn, tránh xa cạnh bo và I/O

:::caution EMC rẻ khi làm sớm, đắt khi làm muộn
Sửa EMI sau khi trượt kiểm tra chứng nhận thường đồng nghĩa **làm lại bo (re-spin)**. Hãy đưa kiểm
soát vòng dòng, nối đất và lọc vào ngay từ layout đầu tiên.
:::

## Xem thêm

- [Đường hồi tiếp & Nối đất](/docs/pcb-design/fundamentals/return-paths-and-grounding)
- [Signal Integrity](/docs/pcb-design/fundamentals/signal-integrity)
- [Điện tử công suất & Dòng lớn](/docs/pcb-design/circuit-blocks/power-electronics)
