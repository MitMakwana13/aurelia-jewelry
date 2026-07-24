import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const [users, subscribers, inquiries] = await Promise.all([
      prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          email: true,
          fullName: true,
          phone: true,
          role: true,
          onboardingCompleted: true,
          isActive: true,
          lastLogin: true,
          createdAt: true,
          _count: {
            select: {
              wishlistItems: true,
            },
          },
        },
      }),
      prisma.newsletterSubscriber.findMany({
        orderBy: { subscribedAt: "desc" },
      }),
      prisma.inquiry.findMany({
        select: { email: true },
      }),
    ]);

    const inquiryCountsByEmail: Record<string, number> = {};
    for (const inq of inquiries) {
      if (inq.email) {
        const key = inq.email.toLowerCase();
        inquiryCountsByEmail[key] = (inquiryCountsByEmail[key] || 0) + 1;
      }
    }

    const registeredUsers = users.map((user) => ({
      ...user,
      wishlistCount: user._count.wishlistItems,
      inquiriesCount: inquiryCountsByEmail[user.email.toLowerCase()] || 0,
    }));

    return NextResponse.json({
      registeredUsers,
      subscribers,
    });
  } catch (error) {
    console.error("Failed to fetch customer data:", error);
    return NextResponse.json({ error: "Failed to fetch customer data" }, { status: 500 });
  }
}
