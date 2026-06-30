---
sidebar_position: 3
title: Đường hồi tiếp & Nối đất
---

# Đường hồi tiếp & Nối đất

Mọi dòng tín hiệu đều chảy theo một **vòng kín**: đi theo đường mạch và **quay về** qua mặt phẳng
đất/tham chiếu. Hình dạng của **đường hồi tiếp** đó chi phối toàn vẹn tín hiệu và EMI nhiều hơn cả
bản thân đường mạch. Nối đất tốt = giải quyết phần lớn vấn đề.

## Ý tưởng then chốt

- Ở tần số cao, dòng hồi tiếp **không** trải đều khắp mặt phẳng — nó chảy trong mặt phẳng **ngay
  dưới đường mạch**, vì đó là đường có điện cảm thấp nhất.
- Vậy nên: tín hiệu và đường về của nó đi **cùng nhau**. Bất cứ thứ gì buộc đường về đi vòng đều
  tạo vòng dòng lớn → ringing, crosstalk và phát xạ.

## Các quy tắc suy ra

- **Mặt phẳng tham chiếu liền** dưới mọi lớp tín hiệu (thường là đất).
- **Đừng bao giờ định tuyến tín hiệu nhanh cắt qua khe/vết cắt** của mặt phẳng tham chiếu — đường
  về phải đi vòng, mở ra một vòng dòng khổng lồ. Đây là lỗi EMI/SI số 1.
- **Đổi lớp:** khi tín hiệu via sang lớp khác, hãy cho đường về một lối đi — đặt **via khâu đất**
  gần đó, hoặc giữ cùng mặt phẳng tham chiếu.
- **Đầu nối & cạnh bo:** thêm chân/khâu đất để dòng hồi tiếp đi theo tín hiệu ra ngoài.

## Chiến lược nối đất (hiện đại)

- Ưu tiên **một mặt đất liền** và **phân vùng bằng sắp đặt** (vùng analog vs vùng số) thay vì cắt
  mặt phẳng thành các đảo.
- Tránh chia cắt mặt phẳng trừ khi bạn thực sự hiểu đường hồi tiếp qua chỗ cắt đó. Cắt sai còn tệ
  hơn không cắt.
- Khâu các vùng đất với nhau bằng nhiều via; giữ trở kháng đất thấp ở mọi nơi.

:::caution Lỗi kinh điển
Một cặp vi sai hoàn hảo định tuyến **qua vết cắt mặt phẳng** sẽ phát xạ và trượt EMC. Lập kế hoạch
hình dạng và vết cắt mặt phẳng **trước khi** định tuyến net nhanh.
:::

## Xem thêm

- [Signal Integrity](/docs/pcb-design/fundamentals/signal-integrity)
- [EMI / EMC](/docs/pcb-design/fundamentals/emi-emc)
- [Analog & Tín hiệu hỗn hợp](/docs/pcb-design/circuit-blocks/analog-mixed-signal) — nối đất để giảm nhiễu
