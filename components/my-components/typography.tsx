import { cn } from "@/lib/utils"; // Убедитесь, что у вас есть утилита cn (classnames)
import { HTMLAttributes } from "react";

// H1
const H1 = ({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h1
        className={cn(
            "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
            className
        )}
        {...props}
    >
        {children}
    </h1>
);

// H2
const H2 = ({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
        className={cn(
            "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
            className
        )}
        {...props}
    >
        {children}
    </h2>
);

// H3
const H3 = ({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h3
        className={cn(
            "scroll-m-20 text-2xl font-semibold tracking-tight",
            className
        )}
        {...props}
    >
        {children}
    </h3>
);

// H4
const H4 = ({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h4
        className={cn(
            "scroll-m-20 text-xl font-semibold tracking-tight",
            className
        )}
        {...props}
    >
        {children}
    </h4>
);

// P (Paragraph)
const P = ({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
    <p
        className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
        {...props}
    >
        {children}
    </p>
);

// Blockquote
const Blockquote = ({ className, children, ...props }: HTMLAttributes<HTMLElement>) => (
    <blockquote
        className={cn("mt-6 border-l-2 pl-6 italic", className)}
        {...props}
    >
        {children}
    </blockquote>
);

// Code (Inline)
const Code = ({ className, children, ...props }: HTMLAttributes<HTMLElement>) => (
    <code
        className={cn(
            "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
            className
        )}
        {...props}
    >
        {children}
    </code>
);

// Lead (Lead paragraph)
const Lead = ({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
    <p
        className={cn("text-xl text-muted-foreground", className)}
        {...props}
    >
        {children}
    </p>
);

// Large (Large text block)
const Large = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn("text-lg font-semibold", className)}
        {...props}
    >
        {children}
    </div>
);

// Small (Small text block)
const Small = ({ className, children, ...props }: HTMLAttributes<HTMLElement>) => (
    <small
        className={cn("text-sm font-medium leading-none", className)}
        {...props}
    >
        {children}
    </small>
);

// Muted (Muted text block)
const Muted = ({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) => (
    <span
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    >
    {children}
  </span>
);

export {
    H1,
    H2,
    H3,
    H4,
    P,
    Blockquote,
    Code,
    Lead,
    Large,
    Small,
    Muted,
};