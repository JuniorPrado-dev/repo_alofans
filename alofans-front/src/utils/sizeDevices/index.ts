// src/utils/sizeDevices.ts
const size = {
  mobile_mini: "320px",
  mobile: "768px",
  tablet: "768px",
  desktop: "768px",
};

export const device = {
  mobile_mini: `(max-width: ${size.mobile_mini})`,
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  desktop: `(min-width: ${size.desktop})`,
};