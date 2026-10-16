// src/app/api/telegram/webhook/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const update = await req.json();
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

    if (update.message?.text?.startsWith("/start")) {
      const coachChatId = update.message.chat.id;
      const coachName = update.message.chat.first_name || "الكابتن";

      // استخراج پارامتر دیپ‌لینک (مثلاً از "/start test_alhouti" مقدار test_alhouti را برمی‌دارد)
      const parts = update.message.text.split(" ");
      const coachSlug = parts[1] || "بدون_شناسه";

      // ۱. ارسال پیام خوش‌آمدگویی به مربی
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: coachChatId,
          text: `مرحباً كابتن ${coachName}! تم تفعيل استقبال الإشعارات بنجاح ✅\nستصلك إشعارات المشتركين هنا مباشرة.`,
        }),
      });

      // ۲. ارسال فوری چت‌آیدی مربی به تلگرام شخصی شما (ادمین)
      if (adminChatId) {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: adminChatId,
            text:
              `🎯 *اتصال مربی جدید!*\n\n` +
              `🏷️ شناسه مربی: \`${coachSlug}\`\n` +
              `👤 نام کاربری: ${coachName}\n` +
              `🆔 چت‌آیدی مربی:\n\`${coachChatId}\`\n\n` +
              `*(روی چت‌آیدی بالا ضربه بزنید تا کپی شود)*`,
            parse_mode: "Markdown",
          }),
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Webhook processing error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
