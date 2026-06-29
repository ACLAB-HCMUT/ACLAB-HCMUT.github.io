---
sidebar_position: 3
title: Lỗi & Rủi ro thường gặp
---

# Lỗi & Rủi ro thường gặp với PCB

Một bo mạch có thể vượt qua DRC mà vẫn bị sụt áp (brown out), trục trặc, không đạt EMC, hoặc bị xưởng sản xuất từ chối. Đây
là những lỗi tái diễn — được nhóm theo từng lĩnh vực, mỗi lỗi trình bày theo dạng **nguyên nhân → hệ quả → cách khắc phục**.

:::tip Phát hiện chúng khi rà soát, đừng để đến sau khi sản xuất
Hầu hết mọi thứ dưới đây đều rẻ để sửa khi rà soát sơ đồ nguyên lý/layout và đắt để sửa sau khi
đặt hàng. Hãy chạy [danh sách kiểm tra DFM](/docs/pcb-design) trước mỗi lần đặt hàng.
:::

## 1. Nguồn & decoupling

- **Thiếu / quá ít decoupling** → đường nguồn sụt áp khi có đỉnh dòng → reset ngẫu nhiên, logic chập chờn. *Cách khắc phục:* một tụ **100 nF** tại mỗi chân nguồn của IC + một tụ bulk (1–10 µF) cho mỗi đường nguồn.
- **Tụ decoupling đặt xa chân** → điện cảm của trace làm mất tác dụng ở tần số cao. *Cách khắc phục:* đặt cùng phía với IC, trace ngắn nhất, via đi thẳng xuống mặt phẳng.
- **Trace nguồn quá nhỏ / không có mặt phẳng nguồn** → sụt áp IR và phát nhiệt. *Cách khắc phục:* định kích thước trace theo dòng điện; dùng mặt phẳng/đổ đồng (pour) cho nguồn và đất.
- **Quên tụ đầu vào/đầu ra của bộ ổn áp** → LDO/buck dao động hoặc gợn sóng (ripple). *Cách khắc phục:* tuân theo các tụ và giá trị mà datasheet yêu cầu.

:::warning Decoupling không phải tùy chọn
Một tụ 100 nF bị thiếu là lỗi kinh điển kiểu "chạy được trên bàn lab, trục trặc ngoài thực địa". Mọi chân nguồn IC
đều cần decoupling cục bộ, đặt sát chân.
:::

## 2. Nối đất & đường hồi tiếp (return path)

- **Mặt phẳng đất bị tách / có khe dưới một tín hiệu nhanh** → dòng hồi tiếp phải đi vòng → vấn đề EMI + toàn vẹn tín hiệu. *Cách khắc phục:* giữ một **mặt phẳng tham chiếu liên tục** bên dưới các trace tốc độ cao.
- **Đường hồi tiếp dài** → dội đất (ground bounce) và nhiễu ghép. *Cách khắc phục:* giữ đường hồi tiếp ngay bên dưới tín hiệu; thêm via khâu đất (stitching vias).
- **Trộn lẫn đất analog và digital một cách bất cẩn** → nhiễu digital len vào phần analog nhạy cảm. *Cách khắc phục:* lên kế hoạch phân vùng đất và điểm nối duy nhất một cách có chủ đích.

## 3. Toàn vẹn tín hiệu

- **Crosstalk** — các trace nằm quá sát nhau hoặc chạy song song dài ghép nhiễu sang nhau → nhiễu, trục trặc. *Cách khắc phục:* áp dụng **quy tắc 3W**, rút ngắn độ dài chạy song song, thêm một trace/mặt phẳng đất ở giữa.
- **Stub, gián đoạn trở kháng, đường tốc độ cao không kết thúc (unterminated)** → phản xạ và rung (ringing). *Cách khắc phục:* giữ trở kháng được kiểm soát liên tục; kết thúc đường truyền (terminate) ở nơi cần thiết.
- **Không khớp độ dài trên các bus song song** (ví dụ bộ nhớ) → lệch pha (skew) → lỗi dữ liệu. *Cách khắc phục:* khớp độ dài trong dung sai của bus.

:::warning Cặp tín hiệu vi sai cần được định tuyến đúng kiểu cặp
USB, Ethernet, CAN, HDMI và các giao thức tương tự dùng **tín hiệu vi sai**. Nếu hai net không được
định tuyến thành một cặp sát nhau, khớp độ dài, với trở kháng vi sai đúng (ví dụ **90 Ω** cho USB,
**100 Ω** cho Ethernet), bạn sẽ gặp lỗi nhận diện thiết bị (enumeration) chập chờn, lỗi CRC, hoặc một liên kết không bao giờ hoạt động.
*Cách khắc phục:* định tuyến chúng cùng nhau, khớp độ dài, và thiết lập trở kháng được kiểm soát từ stackup.
:::

## 4. Ràng buộc về sản xuất (DFM)

Hãy thiết lập quy tắc thiết kế theo **bảng năng lực của xưởng sản xuất trước khi định tuyến** — không phải sau đó.

| Ràng buộc | Nếu quá khắt khe | Giá trị mặc định an toàn (xác nhận với xưởng) |
| --- | --- | --- |
| Độ rộng / khoảng cách trace | Ăn mòn hở mạch hoặc chập mạch | ≥ 6 mil (0.15 mm) |
| Lỗ khoan / pad của via | Lệch lỗ khoan, mạ không tin cậy → hở mạch | ≥ 0.3 mm lỗ khoan / 0.6 mm pad |
| Vành khuyên (annular ring) | Lệch khoan → via hở mạch | ≥ 5 mil (0.13 mm) |
| Đồng tới mép bo (copper-to-edge) | Lộ đồng, chập mạch | ≥ 0.3 mm |
| Nét silkscreen | Chữ không đọc được | ≥ 6 mil |

- **Via quá nhỏ** → xưởng không thể khoan/mạ tin cậy → kết nối chập chờn hoặc hở.
- **Trace quá mỏng** → về dòng điện: quá nhiệt / bong; về quy trình: ăn mòn hở mạch.
- **Góc nhọn / acid trap và mảnh đồng vụn (slivers)** → lỗi ăn mòn. *Cách khắc phục:* tránh góc nhọn sắc; dọn sạch các mảnh vụn.
- **Không có solder mask giữa các pad pitch nhỏ** → cầu chì hàn (solder bridging) khi lắp ráp.
- **Pad/thermal bất đối xứng trên các linh kiện thụ động nhỏ** → **tombstoning** (linh kiện dựng đứng lên) trong quá trình reflow.

:::danger Khớp DRC với xưởng sản xuất đã chọn
Một trace 4 mil / via 0.2 mm có thể ổn ở một xưởng tiên tiến nhưng **bị từ chối hoặc tính phụ phí** ở một
xưởng giá rẻ. Hãy lấy bảng năng lực của nhà sản xuất trước rồi cấu hình DRC theo đó — một DRC sạch
nhưng dựa trên *sai* bộ quy tắc thì vẫn thất bại khi sản xuất.
:::

## 5. Footprint & ký hiệu

- **Sai footprint, sai ánh xạ chân (pin mapping), hoặc sai hướng chân 1 (pin-1)** → không hàn được hoặc bo mạch chết.
- **Sai kích thước pad / pitch, đầu nối bị lật gương** → linh kiện không vừa hoặc lắp ngược.
- **Linh kiện trong thư viện không khớp datasheet** → lỗi âm thầm tồn tại đến tận khâu lắp ráp.

:::warning Đối chiếu mọi footprint với datasheet
Lỗi footprint là một trong những nguyên nhân hàng đầu khiến phải làm lại bo mạch (respin). Hãy kiểm tra kích thước pad, pitch và chân 1
đối chiếu với **datasheet chính thức** — không chỉ dựa vào một ký hiệu thư viện tải về.
:::

## 6. Nhiệt

- **Không đổ đồng / không có thermal via dưới các IC công suất** (bộ ổn áp buck, MCU có pad nhiệt) → quá nhiệt, ngắt mạch. *Cách khắc phục:* thêm phần đổ đồng và dãy via theo khuyến nghị.
- **Không có thermal relief tại các kết nối mặt phẳng** → pad hoạt động như bộ tản nhiệt → mối hàn nguội (cold joint), khó hàn tay.
- **Các linh kiện nóng dồn sát nhau** → ghép nhiệt. *Cách khắc phục:* giãn khoảng cách và định hướng để luồng khí lưu thông.

## 7. Quy trình & bring-up

- **Không có test point / fiducial** → khó gỡ lỗi và khó lắp ráp (máy không căn chỉnh được).
- **Thiếu dấu phân cực, chấm chân 1, nhãn** → sai sót khi lắp ráp.
- **Đặt hàng trước khi rà soát thiết kế** → respin tốn kém. *Cách khắc phục:* rà soát sơ đồ nguyên lý, layout, **và Gerber trong trình xem** trước.

:::tip Danh sách kiểm tra trước khi đặt hàng
- [ ] DRC sạch **theo quy tắc của xưởng sản xuất**
- [ ] Mọi IC đã có decoupling; bộ ổn áp có đủ tụ theo datasheet
- [ ] Cặp vi sai đã định tuyến + thiết lập trở kháng; bus đã khớp độ dài
- [ ] Footprint đã kiểm tra đối chiếu datasheet
- [ ] Có test point, fiducial, dấu phân cực
- [ ] BOM đã xác minh; Gerber đã xem trước khi gửi
:::

## Tài liệu tham khảo

- [Tài liệu KiCad](https://docs.kicad.org/) — quy tắc thiết kế và định tuyến.
- Hướng dẫn DFM / năng lực của nhà sản xuất (ví dụ JLCPCB, OSH Park) — giới hạn sản xuất thực tế.
- Xem thêm: [Phần mềm thiết kế PCB (Công cụ EDA)](/docs/pcb-design/eda-tools) và [Firmware nhúng](/docs/embedded-firmware).
