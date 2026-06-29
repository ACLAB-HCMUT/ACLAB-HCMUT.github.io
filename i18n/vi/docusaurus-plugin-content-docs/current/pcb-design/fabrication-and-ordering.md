---
sidebar_position: 4
title: Từ thiết kế đến giao hàng
---

# Từ thiết kế đến giao hàng

Toàn bộ hành trình từ một layout hoàn chỉnh đến những bo mạch nằm trên bàn làm việc của bạn, lấy **JLCPCB** làm
ví dụ minh họa. Các xưởng khác (PCBWay, OSH Park, Aisler…) đều theo cùng luồng làm việc với giao diện khác nhau.

```
Design → DRC → Export files → Upload & review → Choose options → Order → Fabricate → Ship → Customs → You
```

## 1. Hoàn thiện & chạy DRC

Trước khi xuất bất cứ thứ gì, hãy chạy **Design Rule Check** của công cụ với các quy tắc được thiết lập theo bảng
năng lực của xưởng sản xuất (xem [Lỗi & Rủi ro thường gặp](/docs/pcb-design/common-mistakes)).

- [ ] DRC sạch theo quy tắc của **xưởng sản xuất** (không chỉ là mặc định)
- [ ] Footprint đã xác minh đối chiếu datasheet
- [ ] Có silkscreen, dấu phân cực, fiducial, test point
- [ ] Đường viền bo mạch (edge cuts) khép kín và chính xác

## 2. Tạo các file đầu ra để sản xuất

Các xưởng không nhận file dự án gốc của bạn — họ nhận các file đầu ra chuẩn. Thông thường bạn **nén (zip)**:

| File | Định dạng | Là gì |
| --- | --- | --- |
| **Gerber** | RS-274X (`.gbr`) | Đồng, solder mask, silkscreen, paste — mỗi lớp một file |
| **File khoan** | Excellon (`.drl`) | Vị trí và kích thước các lỗ |
| **BOM** | `.csv` | Danh mục vật tư (chỉ khi đặt lắp ráp) |
| **Pick-and-place / CPL** | `.csv` | Tọa độ X/Y, góc xoay, mặt của linh kiện (chỉ khi lắp ráp) |

:::tip KiCad → JLCPCB
KiCad xuất Gerber + file khoan từ **File → Plot / Generate Drill Files**, hoặc dùng
**plugin JLCPCB** để tạo đúng bộ Gerber/BOM/CPL chỉ bằng một cú nhấp. Luôn **xem trước
Gerber trong trình xem** trước khi nén — đây là lần kiểm tra giá rẻ cuối cùng của bạn.
:::

## 3. Tải lên & rà soát

- Tải file zip lên; trang web sẽ hiển thị nó trong một **trình xem Gerber trực tuyến**.
- Xác nhận sự căn chỉnh các lớp, kích thước bo mạch, và không có gì bị thiếu hay bị lật gương.
- Hệ thống tự động phát hiện số lớp và kích thước — hãy kiểm tra lại cho hợp lý.

## 4. Chọn các tùy chọn sản xuất

Các thông số phổ biến (hiển thị giá trị mặc định của JLCPCB — các xưởng khác cũng tương tự):

| Tùy chọn | Mặc định điển hình | Ghi chú |
| --- | --- | --- |
| Vật liệu nền | FR-4 | Tấm laminate sợi thủy tinh tiêu chuẩn |
| Số lớp | 2 | Có sẵn 1–6+; nhiều lớp hơn thì đắt hơn |
| Độ dày | 1.6 mm | Tùy chọn 0.6–2.0 mm |
| **Màu PCB (solder mask)** | Xanh lá | Đỏ, xanh dương, đen, trắng, vàng, tím… màu không phải xanh lá có thể cộng thêm một ngày |
| Lớp hoàn thiện bề mặt | HASL (không chì) | **ENIG** (vàng, phẳng) đắt hơn — tốt hơn cho pitch nhỏ/QFN |
| Trọng lượng đồng | 1 oz | 2 oz cho dòng điện cao hơn |
| Phủ via | Tented (phủ) | Tùy chọn phủ/bít (cover/plug) |
| Đặc biệt | — | Lỗ castellated, gold fingers, kiểm soát trở kháng (tính thêm phí) |

:::note Màu sắc & lớp hoàn thiện không chỉ là thẩm mỹ
**ENIG** cho bề mặt vàng phẳng, dễ hàn — hãy chọn nó cho các linh kiện pitch nhỏ; **HASL** thì
rẻ hơn nhưng hơi gồ ghề. Solder mask màu tối (đen) có thể khiến việc sửa chữa/kiểm tra khó hơn.
:::

## 5. Lắp ráp (PCBA) — tùy chọn

:::note PCB vs. PCBA
- **PCB** = **bo mạch trần** — đồng, mask, silkscreen, lỗ. Chưa có linh kiện nào trên đó.
- **PCBA** = **PCB + Assembly** — bo mạch đã hàn linh kiện, sẵn sàng sử dụng.

Bạn có thể chỉ đặt PCB rồi tự hàn tay, hoặc đặt một PCBA hoàn chỉnh và nhận bo mạch đã gắn linh kiện.
:::

Nếu bạn không muốn hàn tay, các xưởng cung cấp dịch vụ **lắp ráp SMT**:

- Cung cấp các file **BOM** + **pick-and-place (CPL)**.
- Linh kiện lấy từ thư viện của xưởng (JLCPCB dùng **LCSC**). **Basic parts** rẻ nhất;
  **Extended parts** thì cộng thêm phí nạp cuộn (per-reel loading fee).
- Bạn thường lắp một mặt (SMT); xuyên lỗ hoặc cả hai mặt có thể tốn thêm chi phí.

### Rủi ro PCBA cần kiểm tra trước khi đặt hàng

Lắp ráp thêm vào những kiểu hỏng mà một PCB trần không có — hầu hết đều rẻ để phát hiện ngay bây giờ, đắt sau khi sản xuất:

- **Sai footprint** → linh kiện không vừa hoặc không hàn được. *Cách khắc phục:* xác minh kích thước pad/pitch đối chiếu với **datasheet**, không chỉ một ký hiệu thư viện.
- **Sai hướng / sai góc xoay** → người lắp ráp đặt chân 1 sai hướng → linh kiện chết hoặc bị phá hủy. *Cách khắc phục:* kiểm tra **dấu phân cực** (diode, tụ hóa, IC) và xác nhận **góc xoay trong file CPL** — góc xoay của linh kiện trong thư viện của bạn thường khác với kỳ vọng của xưởng (một cái bẫy kinh điển của JLCPCB; hãy xem trước vị trí đặt trước khi xác nhận).
- **Linh kiện tồn kho thấp / hết hàng** → linh kiện đã chọn hết hàng trước/lúc lắp ráp → đơn hàng bị trễ hoặc chỉ gắn được một phần. *Cách khắc phục:* kiểm tra **tồn kho trực tiếp (live stock)** khi chọn linh kiện; ưu tiên linh kiện **Basic/có sẵn**; chuẩn bị sẵn một mã linh kiện thay thế.
- **Linh kiện ngừng sản xuất (EOL) / thời gian giao hàng dài** → ổn cho một nguyên mẫu, nhưng rủi ro cho bất kỳ lần dựng lại nào. *Cách khắc phục:* tránh linh kiện EOL; ghi chú thời gian giao hàng cho bất cứ thứ gì quan trọng.
- **MOQ & phí extended-part** → số lượng nhỏ có thể kèm theo chi phí đặt hàng tối thiểu và phí nạp cuộn. *Cách khắc phục:* tính những khoản này vào báo giá.

:::warning Khóa BOM của bạn vào các linh kiện thực, có sẵn trong kho
Một bo mạch thiết kế quanh một linh kiện đang **hết hàng** (hoặc EOL) có thể làm đình trệ cả đơn hàng.
Hãy chọn linh kiện có **tồn kho trực tiếp dồi dào**, ưu tiên thư viện basic/preferred của xưởng, và giữ
một mã linh kiện dự phòng cho bất cứ thứ gì quan trọng.
:::

## 6. Đặt hàng

- Thiết lập **số lượng** (5 cái là mức tối thiểu phổ biến cho nguyên mẫu) và **thời gian sản xuất**.
- Rà soát báo giá tự động (bo mạch + lắp ráp + vận chuyển).
- Thanh toán; việc sản xuất một bo mạch 2 lớp tiêu chuẩn thường mất **~24–48 giờ**.

:::tip Chi phí nguyên mẫu xấp xỉ
Một bo mạch 2 lớp tiêu chuẩn (≤100×100 mm, xanh lá, 1.6 mm, HASL) thường chỉ vài đô la Mỹ cho
5 cái — **phí vận chuyển thường tốn hơn cả tiền bo mạch**. Giá và khuyến mãi thay đổi; hãy kiểm tra
báo giá trực tiếp.
:::

## 7. Vận chuyển

- Chọn một hãng chuyển phát (ví dụ chuyển phát nhanh kiểu DHL/FedEx, hoặc bưu chính/economy rẻ hơn).
- Express mất vài ngày; economy có thể mất vài tuần. Bạn sẽ nhận được mã theo dõi (tracking number).
- Tổng thời gian ≈ **sản xuất + vận chuyển** — hãy lập kế hoạch quanh cả hai.

## 8. Xuất nhập khẩu & hải quan

:::caution Chỉ là hướng dẫn chung — hãy xác minh cho quốc gia của bạn
Phần dưới đây là một tổng quan sơ bộ, không mang tính thẩm quyền. Quy định khác nhau theo quốc gia và thay đổi; hãy xác nhận
với hãng vận chuyển hoặc cơ quan hải quan/nhập khẩu địa phương, và với cơ sở của bạn nếu đặt hàng thông qua cơ sở đó.
:::

- **Thuế hải quan / thuế VAT/GST nhập khẩu có thể được áp dụng** tùy thuộc vào quốc gia của bạn và giá trị khai báo; một số nơi miễn cho bưu kiện giá trị thấp, một số nơi thì không.
- **Hãng vận chuyển thường xử lý thông quan** và có thể **thu thuế/phí khi giao hàng** — hãy dự trù ngân sách cho khoản này.
- **Kiểm tra hải quan có thể làm phát sinh độ trễ**; hãy giữ sẵn hóa đơn thương mại và chi tiết đơn hàng.
- Giá trị khai báo, nội dung và **mã HS** được ghi trên chứng từ vận chuyển; khai thiếu giá trị **có khả năng** là một vi phạm — hãy tránh điều đó.
- Với các bo mạch nghiên cứu/sở thích thông thường, việc này thường là quy trình thường lệ, nhưng **các thiết kế nhạy cảm hoặc bị kiểm soát** (một số phần cứng RF, mật mã, hoặc liên quan đến quốc phòng) **có khả năng** thuộc diện **quy định kiểm soát xuất khẩu** — hãy kiểm tra trước khi gửi thiết kế ra nước ngoài.
- Nếu đặt hàng cho phòng lab/trường đại học, có thể có **quy định mua sắm hoặc nhập khẩu của cơ sở** — hãy hỏi trước.

## Nghiên cứu trường hợp JLCPCB (nguyên mẫu điển hình)

1. Hoàn thiện layout trong **KiCad**, chạy **DRC** theo năng lực của JLCPCB.
2. Xuất **Gerber + file khoan** (hoặc một cú nhấp qua plugin JLCPCB); nén chúng lại.
3. Tải lên JLCPCB → kiểm tra **trình xem Gerber**.
4. Tùy chọn: **2 lớp, FR-4, 1.6 mm, xanh lá, HASL không chì, 1 oz, 5 cái**.
5. (Tùy chọn) Thêm **lắp ráp SMT** với BOM + CPL từ linh kiện LCSC.
6. Đặt hàng → sản xuất **~24–48 giờ** → gửi qua hãng đã chọn → đến nơi sau khi qua hải quan.

## Tối ưu chi phí

Phần lớn giá thành được quyết định bởi một số ít lựa chọn. Hãy chọn tùy chọn rẻ nhất mà vẫn đáp ứng
nhu cầu về độ tin cậy của bạn.

### Điều gì quyết định giá PCB

| Yếu tố | Ảnh hưởng đến giá | Lựa chọn rẻ hơn |
| --- | --- | --- |
| **Số lớp** | Bước nhảy đơn lẻ lớn nhất (2 → 4 → 6) | Giữ ở **2 lớp** nếu định tuyến được |
| **Diện tích bo mạch** | Bo mạch lớn hơn = đắt hơn | Thu nhỏ layout; nằm trong các khung kích thước (ví dụ ≤100×100 mm) |
| **Trace/space & via/hole tối thiểu** | Quy tắc khắt khe đẩy bạn vào hạng "advanced" đắt hơn | Giữ **standard** (≥ 6 mil track, ≥ 0.3 mm via) |
| **Lớp hoàn thiện bề mặt** | ENIG > HASL | **HASL** trừ khi cần pitch nhỏ/QFN |
| **Màu solder mask** | Không phải xanh lá có thể cộng thời gian/chi phí | **Xanh lá** |
| **Trọng lượng đồng** | 2 oz > 1 oz | **1 oz** trừ khi dòng điện cao |
| **Độ dày** | Không tiêu chuẩn thì đắt hơn | **1.6 mm** |
| **Tính năng đặc biệt** | Via-in-pad, blind/buried vias, kiểm soát trở kháng, castellated, gold fingers đều tốn thêm | Tránh trừ khi bắt buộc |
| **Thời gian sản xuất** | Nhanh hơn = đắt hơn | Thời gian giao hàng tiêu chuẩn |
| **Số lượng** | Có mức giảm giá theo từng bo | Gộp đơn với bạn cùng lab |

:::note Kích thước via là một bậc giá, không chỉ là một quy tắc
Yêu cầu via/lỗ rất nhỏ hoặc trace mỏng sẽ đẩy cả bo mạch vào quy trình **advanced** của xưởng —
đắt hơn và tỷ lệ thành phẩm (yield) thấp hơn. Hãy dùng kích thước via tiêu chuẩn trừ khi pitch của linh kiện
thực sự buộc phải nhỏ hơn. Xem [Lỗi & Rủi ro thường gặp](/docs/pcb-design/common-mistakes).
:::

### Điều gì quyết định giá PCBA (lắp ráp)

- **Một mặt hay hai mặt SMT** → một mặt rẻ hơn → **đặt tất cả linh kiện SMT trên một mặt**.
- **SMT hay xuyên lỗ** → THT thường đồng nghĩa với chi phí hàn tay phát sinh → ưu tiên linh kiện SMT.
- **Số linh kiện đơn nhất & tổng số lần đặt linh kiện** → ít linh kiện đơn nhất hơn = ít thiết lập hơn.
- **Basic vs Extended parts** (JLCPCB) → linh kiện **Extended** cộng thêm phí nạp theo từng loại; linh kiện **Basic** thì không → ưu tiên linh kiện Basic/preferred.
- **Phí stencil & thiết lập** → chi phí cố định được phân bổ dần trên số lượng lớn hơn.

:::tip Những cách thắng nhanh
- Giữ ở **2 lớp** + quy tắc thiết kế tiêu chuẩn bất cứ khi nào định tuyến cho phép.
- Giữ **tất cả linh kiện SMT trên một mặt** của bo mạch.
- Ưu tiên linh kiện **Basic / có sẵn trong kho**; giảm thiểu số mã linh kiện đơn nhất.
- **Mask xanh lá + HASL + 1.6 mm + 1 oz** là cấu hình tiêu chuẩn rẻ nhất.
- Không gấp? Chọn **vận chuyển economy** và thời gian sản xuất tiêu chuẩn.
- **Gộp đơn hàng** với bạn cùng lab để vượt mức tối thiểu và chia sẻ phí vận chuyển.
:::

:::caution Đừng tối ưu vượt quá độ tin cậy
Rẻ hơn không phải lúc nào cũng tốt hơn. Hãy chọn **ENIG** cho pitch nhỏ/QFN, đồng **2 oz** cho phần công suất, hoặc
**4 lớp** khi sự toàn vẹn tín hiệu cần một mặt phẳng tham chiếu vững chắc. Vài đô la thêm ở đây
giúp tránh một lần respin — đó mới là chi phí thực sự.
:::

## Tài liệu tham khảo

- [Tài liệu KiCad](https://docs.kicad.org/) — xuất Gerber và file khoan.
- Hướng dẫn năng lực & đặt hàng của xưởng — ví dụ **JLCPCB**, **PCBWay**, **OSH Park**.
- Xem thêm: [Phần mềm thiết kế PCB (Công cụ EDA)](/docs/pcb-design/eda-tools) · [Lỗi & Rủi ro thường gặp](/docs/pcb-design/common-mistakes).
