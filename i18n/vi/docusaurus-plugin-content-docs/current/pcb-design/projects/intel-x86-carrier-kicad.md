---
sidebar_position: 5
title: Intel x86 Carrier Board — KiCad Workflow & Mechanical
---

# Intel x86 Carrier Board — KiCad Workflow & Mechanical

Đây là một checklist KiCad có thể lặp lại để thiết kế bo carrier: một bo **6 lớp,
kiểm soát trở kháng (controlled-impedance)** gia công tại **JLCPCB**. Hãy làm tuần tự qua các mục —
mỗi mục là cửa kiểm soát (gate) cho mục kế tiếp. Bỏ qua một bước kiểm chứng ở đây là một trong những
cách rẻ nhất để lãng phí một lượt gia công.

:::note
Để thiết lập công cụ và quản lý thư viện, xem [EDA Tools](/docs/pcb-design/eda-tools). Để hiểu cơ sở
về toàn vẹn tín hiệu (signal integrity) đằng sau các giao tiếp tốc độ cao (PCIe, HDMI, USB3, SATA), xem
[Intel x86 Carrier Board — High-Speed Design](/docs/pcb-design/projects/intel-x86-carrier-high-speed).
:::

## Schematic

Làm cho schematic đúng trước khi đụng đến layout — phần lớn nỗi đau khi layout đều bắt nguồn từ một
schematic cẩu thả.

1. **Đặt nhãn rõ ràng cho mọi net tốc độ cao.** Đừng dựa vào kết nối dây ngầm định cho bất cứ thứ gì
   sẽ cần kiểm soát trở kháng hay tinh chỉnh chiều dài.
2. **Dùng một quy ước đặt tên cặp vi sai (diff-pair) nhất quán.** Ví dụ `PCIE_TX0_P` / `PCIE_TX0_N`,
   `HDMI_D0_P` / `HDMI_D0_N`. Chọn quy ước một lần và áp dụng ở mọi nơi.
3. **Dùng nhãn phân cấp (hierarchical) và nhãn toàn cục (global) một cách có chủ đích.** Nhãn phân cấp cho các tín hiệu
   đi qua ranh giới giữa các sheet thông qua một port xác định; nhãn toàn cục chỉ dành cho những net thực sự toàn bo
   (rail nguồn, reset, clock chung). Đừng trộn lẫn chúng do sơ ý.
4. **Chỉ thêm `PWR_FLAG` ở nơi ERC thực sự cần một khai báo nguồn (power-source)** (ví dụ một rail
   được cấp từ một connector hay một ngõ ra ổn áp mà ERC không nhìn thấy nó đang điều khiển net theo cách khác).
5. **Đánh dấu các chân cố tình không dùng là `NC`** để ERC ngừng cảnh báo và người rà soát có thể thấy
   việc bỏ trống là có chủ đích.
6. **Ghi tài liệu cho các điện trở strap và mức logic mặc định** ngay cạnh các tín hiệu liên quan —
   boot strap, chọn chế độ (mode select), và các chân cấu hình bus. Người đọc không nên phải đoán
   trạng thái mặc định.

:::caution
`PWR_FLAG` làm im lặng ERC về hướng nguồn — nó **không** phải cách để giấu một lỗi hướng nguồn
thực sự. Nếu bạn thấy mình đang thêm flag để làm các cảnh báo biến mất, hãy dừng lại và
xác nhận hướng nguồn/tải (source/sink) thực tế của net trước.
:::

### Đặt tên cặp vi sai (differential-pair)

KiCad nhận diện các cặp vi sai bằng một **quy ước hậu tố (suffix)** trên tên net. Hãy giữ nó
nhất quán trên toàn bộ bo:

- Thường là `_P` / `_N` hoặc `+` / `-`, tùy theo thiết lập bo của bạn.
- Hai thành viên của một cặp phải dùng chung tên gốc và chỉ khác nhau ở hậu tố
  (`PCIE_TX0_P` ↔ `PCIE_TX0_N`).
- Nếu hậu tố không nhất quán, công cụ router cặp vi sai và tinh chỉnh chiều dài sẽ không ghép cặp
  các net, và bạn sẽ routing chúng như hai đường single-ended không liên quan.

## Layout

Thiết lập các quy tắc thiết kế (design rules) **trước khi** routing. Trong KiCad, net class và quy tắc trở kháng điều khiển
router và DRC; định nghĩa chúng sau khi đã routing đồng nghĩa với việc phải routing lại.

1. **Tạo các net class** cho mỗi họ tín hiệu: PCIe, HDMI, USB3, SATA, tốc độ thấp, và nguồn.
2. **Đặt quy tắc bề rộng, clearance, và cặp vi sai cho từng class TRƯỚC KHI routing** để router thực thi
   chúng ngay khi bạn làm thay vì sau đó.
3. **Gán quy tắc trở kháng theo lớp.** Ánh xạ mỗi class tốc độ cao tới (các) lớp nơi
   trở kháng mục tiêu của nó đạt được trong stackup đã chọn.
4. **Chỉ dùng tinh chỉnh chiều dài (length tuning) sau khi topology đã đúng các mặt khác.** Hãy làm đúng cách đặt linh kiện, gán lớp,
   và đường trở về trước; các đường zigzag (meander) là bước cuối cùng, không phải cách sửa cho routing tệ.
5. **Kiểm tra đường trở về trước khi tin vào bất kỳ giá trị khớp chiều dài nào.** Một cặp đã khớp chiều dài
   trên một mặt phẳng tham chiếu bị tách vẫn là một cặp hỏng — hãy kiểm chứng tham chiếu liên tục dưới mỗi
   đường tốc độ cao.
6. **Dùng kiểm tra 3D và footprint** để xác nhận hướng connector và khoảng trống cơ khí
   trước khi chốt cách đặt linh kiện.

:::tip
Định nghĩa net class và quy tắc trở kháng trong **Board Setup** trước, rồi mới routing. KiCad áp dụng chúng
trực tiếp (live), nên các vi phạm xuất hiện ngay lập tức thay vì thành một loạt lỗi DRC ở cuối.
:::

## Verification

Verification không phải một cửa kiểm soát duy nhất ở cuối dự án — hãy chạy các kiểm tra này liên tục.

1. **Chạy ERC trước khi đặt linh kiện.** Sửa lỗi schematic khi chúng còn rẻ.
2. **Chạy DRC thường xuyên trong khi routing**, không chỉ một lần ở cuối, để các vi phạm còn cục bộ và
   dễ truy vết.
3. **Kiểm tra các mục chưa kết nối (unconnected items) một cách thủ công.** Đừng cho rằng ratsnest đã rỗng chỉ vì DRC
   im lặng — hãy rà qua danh sách unconnected-items.
4. **Rà soát các tệp đầu ra gia công và tệp khoan (drill).** Mở các Gerber và tệp khoan đã tạo
   trong một trình xem và xác nhận chúng khớp với ý định của bạn.
5. **Kiểm tra ghi chú trở kháng theo stackup thực tế đã đặt hàng.** Các mục tiêu trở kháng bạn
   thiết kế chỉ có giá trị với stackup mà bạn thực sự đặt hàng — hãy đối chiếu chúng.

:::note
Trước khi tạo đơn hàng, hãy đi qua checklist trước-khi-đặt-hàng trong
[Fabrication and Ordering](/docs/pcb-design/fabrication-and-ordering). Các lỗi schematic và
layout thường gặp được tập hợp trong [Common Mistakes](/docs/pcb-design/common-mistakes).
:::

## Cơ khí & nối đất

Bo carrier phải sống sót qua một hộp vỏ thật, một coreboard, một heatsink, và các cáp
ngoài. Hãy coi cơ khí và nối đất là một phần của thiết kế, không phải chuyện tính sau.

1. **Nối các vỏ (shell) và shield của connector theo best practice của từng giao tiếp.** Mỗi giao tiếp
   (HDMI, USB3, SATA, v.v.) có quy ước nối đất shield riêng — hãy theo nó thay vì
   nối mọi thứ với nhau một cách mù quáng.
2. **Thêm via stitching GND quanh các connector tốc độ cao bên ngoài** để cung cấp đường trở về
   chặt và ngăn phát xạ (emission) ở mép bo.
3. **Quyết định chassis ground và signal GND một cách có chủ đích.** Hãy chọn ở đâu (và có hay không) chúng nối với nhau,
   và biến nó thành một quyết định thiết kế rõ ràng thay vì một sự cố ngẫu nhiên của vùng đồng phủ.
4. **Cung cấp lỗ bắt vít (mounting hole) và keepout** cho coreboard, heatsink, và các connector,
   với khoảng trống đúng và không có đồng ở nơi phần cứng cơ khí đặt vào.
5. **Giữ các đặc điểm bên ngoài có thể tiếp cận về mặt cơ khí:** vùng antenna sạch khỏi đồng và kim loại gần đó,
   các phích HDMI, cáp SATA, và connector USB đều có thể với tới trong cụm lắp ráp cuối cùng.

:::tip
Dùng **trình xem 3D** của KiCad với coreboard, heatsink, và các connector ghép nối đã được nạp để xác nhận
khoảng trống và khả năng tiếp cận trước khi bạn hoàn thiện đường bao bo (board outline) và các lỗ bắt vít.
:::
