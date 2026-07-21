import { Skeleton } from "@/components/ui/skeleton";
export function PageHeaderSkeleton() {
    return (<div className="space-y-2">
      <Skeleton className="h-8 w-48"/>
      <Skeleton className="h-4 w-72"/>
    </div>);
}
export function StatCardsSkeleton({ count = 3 }) {
    return (<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (<Skeleton key={i} className="h-28 rounded-2xl"/>))}
    </div>);
}
export function TableSkeleton({ rows = 8 }) {
    return (<div className="rounded-2xl border border-border/50 overflow-hidden">
      <Skeleton className="h-10 w-full rounded-none"/>
      {Array.from({ length: rows }).map((_, i) => (<Skeleton key={i} className="h-12 w-full rounded-none border-t border-border/30"/>))}
    </div>);
}
export function CardGridSkeleton({ count = 6 }) {
    return (<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (<Skeleton key={i} className="h-36 rounded-2xl"/>))}
    </div>);
}
export function ChartSkeleton() {
    return <Skeleton className="h-[300px] w-full rounded-2xl"/>;
}
export function DashboardSkeleton() {
    return (<div className="flex flex-col gap-3 animate-in fade-in duration-300">
      <Skeleton className="h-24 w-full rounded-2xl"/>
      <div className="grid gap-3 lg:grid-cols-12">
        <Skeleton className="h-64 rounded-2xl lg:col-span-3"/>
        <Skeleton className="h-64 rounded-2xl lg:col-span-4"/>
        <Skeleton className="h-64 rounded-2xl lg:col-span-5"/>
      </div>
    </div>);
}
export function MaterialLibrarySkeleton() {
    return (<div className="space-y-4">
      <PageHeaderSkeleton />
      <div className="flex gap-4">
        <Skeleton className="hidden lg:block h-[520px] w-56 shrink-0 rounded-2xl"/>
        <div className="flex-1 space-y-4">
          <Skeleton className="h-11 w-full rounded-xl"/>
          <TableSkeleton rows={10}/>
        </div>
      </div>
    </div>);
}
