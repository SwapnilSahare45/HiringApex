import { cn } from "@/lib/utils";

export function TypographyH1({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <h2
      className={cn(
        "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function TypographyH4({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h4>
  );
}

export function TypographyP({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return <p className={cn("leading-7", className)}>{children}</p>;
}

export function TypographyBlockquote({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <blockquote className={cn("mt-6 pl-6 italic", className)}>
      {children}
    </blockquote>
  );
}

export function TypographyList({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return <ul className={cn("my-6 list-disc", className)}>{children}</ul>;
}

export function TypographyMuted({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <p className={cn("text-muted-foreground text-sm", className)}>{children}</p>
  );
}
