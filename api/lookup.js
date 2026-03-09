export default function handler(req, res) {
  const { phone } = req.query;

  const apiName = "BROKEN LORD KING – Global Offline Carrier Lookup API";

  if (!phone) {
    return res.status(200).json({
      api: apiName,
      author: "Lord Broken",
      description: "Global offline carrier lookup. No API key required.",
      usage: "Add ?phone=NUMBER",
      example: `https://${req.headers.host}/api/lookup?phone=+2557XXXXXXX`
    });
  }

  const digits = phone.replace(/\D/g, "");
  if (digits.length < 6) {
    return res.status(200).json({
      api: apiName,
      valid: false,
      reason: "Phone number too short",
      phone
    });
  }

  // Tanzania example only (global mapping can be added later)
  const prefixes = {
    vodacom: ["075", "076"],
    airtel: ["068", "078"],
    tigo: ["065", "071", "067"],
    halotel: ["062"],
    zantel: ["077"]
  };

  const local = digits.startsWith("255")
    ? "0" + digits.slice(3)
    : digits.startsWith("0")
    ? digits
    : "0" + digits.slice(-9);

  const prefix = local.slice(0, 3);

  let carrier = "unknown";
  for (const c in prefixes) {
    if (prefixes[c].includes(prefix)) {
      carrier = c;
      break;
    }
  }

  return res.status(200).json({
    api: apiName,
    author: "Lord Broken",
    valid: true,
    phone,
    country: "Tanzania",
    country_code: "+255",
    carrier,
    prefix,
    line_type: "mobile",
    local_format: local,
    international_format: "+255" + local.slice(1)
  });
}
