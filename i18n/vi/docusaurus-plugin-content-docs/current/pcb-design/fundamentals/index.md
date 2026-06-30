---
sidebar_position: 1
title: Toàn vẹn tín hiệu & nguồn
---

# Toàn vẹn tín hiệu & nguồn

Phần vật lý quyết định một bo mạch có *chạy được* hay không khi tín hiệu nhanh lên hoặc dòng lớn
lên. Các chủ đề này **xuyên suốt** — chúng áp dụng cho mọi [khối mạch](/docs/pcb-design/circuit-blocks),
không riêng khối nào. Học một lần, dùng ở mọi nơi.

## Các khái niệm

| Chủ đề | Ý tưởng cốt lõi | Trang |
| --- | --- | --- |
| **Toàn vẹn tín hiệu (SI)** | Sườn nhanh = đường truyền; phản xạ, termination, crosstalk | [Signal Integrity](/docs/pcb-design/fundamentals/signal-integrity) |
| **Đường hồi tiếp & nối đất** | Dòng luôn quay về; giữ đường về ngay dưới tín hiệu | [Đường hồi tiếp & Nối đất](/docs/pcb-design/fundamentals/return-paths-and-grounding) |
| **EMI / EMC** | Phát xạ & miễn nhiễm; đạt chứng nhận và không tự gây nhiễu | [EMI / EMC](/docs/pcb-design/fundamentals/emi-emc) |
| **Trở kháng & stackup** | Hình học đường + chồng lớp quyết định trở kháng | [Trở kháng & Stackup](/docs/pcb-design/fundamentals/impedance-and-stackup) |
| **Vùng đồng & nhiệt** | Fill zone, thermal relief, điện dung mặt phẳng, nhiệt | [Vùng đồng & Nhiệt](/docs/pcb-design/fundamentals/copper-pours-and-thermal) |

## Vì sao quan trọng

Một sơ đồ có thể hoàn hảo mà bo vẫn hỏng vì **cách layout**: một đường gây phản xạ, một dòng hồi
tiếp bị buộc đi vòng, một vết cắt mặt phẳng gây phát xạ. Năm chủ đề này là khác biệt giữa "mô phỏng
đạt" và "phần cứng qua EMC và boot mỗi lần".

:::tip Chúng liên kết với nhau
SI, đường hồi tiếp, EMI và trở kháng là **cùng một vật lý** nhìn từ các góc khác nhau. Một đường
hồi tiếp sạch vừa tốt cho SI, vừa giảm EMI, vừa giúp trở kháng kiểm soát. Sửa đất/stackup thì hầu
hết vấn đề nhỏ lại cùng lúc.
:::

## Xem thêm

- [Thiết kế theo khối mạch](/docs/pcb-design/circuit-blocks)
- [Lỗi & Rủi ro thường gặp](/docs/pcb-design/common-mistakes)
