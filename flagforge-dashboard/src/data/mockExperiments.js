export const initialExperiments = [
  {
    id: "exp_001",
    name: "Checkout CTA Copy Test",
    status: "running",
    startDate: "2026-08-20",
    variantA: { name: "Control", conversions: 412, visitors: 5230 },
    variantB: { name: "Variant B", conversions: 498, visitors: 5185 },
    confidence: 96,
  },
  {
    id: "exp_002",
    name: "Pricing Page Layout",
    status: "running",
    startDate: "2026-08-29",
    variantA: { name: "Control", conversions: 201, visitors: 3012 },
    variantB: { name: "Variant B", conversions: 219, visitors: 2987 },
    confidence: 91,
  },
  {
    id: "exp_003",
    name: "Onboarding Tooltip Timing",
    status: "completed",
    startDate: "2026-07-10",
    variantA: { name: "Control", conversions: 1188, visitors: 9800 },
    variantB: { name: "Variant B", conversions: 1042, visitors: 9765 },
    confidence: 88,
  },
];
