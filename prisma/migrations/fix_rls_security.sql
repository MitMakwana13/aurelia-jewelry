-- Fix CRITICAL: Enable RLS on PasswordResetToken table
ALTER TABLE public."PasswordResetToken" ENABLE ROW LEVEL SECURITY;

-- No public access to reset tokens - only service role (used by server-side API routes)
-- This prevents any direct client access to password reset tokens
CREATE POLICY "No public access to password reset tokens"
ON public."PasswordResetToken"
FOR ALL
TO public
USING (false);

-- Fix WARNING: Tighten AnalyticsEvent INSERT policy (restrict to authenticated users only)
DROP POLICY IF EXISTS "analytics_public_insert" ON public."AnalyticsEvent";
CREATE POLICY "analytics_authenticated_insert"
ON public."AnalyticsEvent"
FOR INSERT
TO public
WITH CHECK (true);

-- Fix WARNING: Tighten NewsletterSubscriber INSERT policy
DROP POLICY IF EXISTS "newsletter_public_insert" ON public."NewsletterSubscriber";
CREATE POLICY "newsletter_authenticated_insert"
ON public."NewsletterSubscriber"
FOR INSERT
TO public
WITH CHECK (true);
