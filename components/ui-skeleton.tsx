import { Skeleton } from "@/components/ui/skeleton"

export function TestCardSkeleton() {
  return (
    <div className="rounded-lg border p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-[150px]" />
        <Skeleton className="h-5 w-[60px]" />
      </div>
      <Skeleton className="h-4 w-[100px]" />
      <div className="flex items-center gap-4 pt-2">
        <Skeleton className="h-4 w-[120px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
      <Skeleton className="h-9 w-full mt-4" />
    </div>
  )
}

export function UserCardSkeleton() {
  return (
    <div className="flex items-center space-x-4 rounded-lg border p-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <Skeleton className="h-4 w-[100px] mb-2" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-8 w-[60px]" />
      </div>
    </div>
  )
}

export function QuestionSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-full max-w-[300px]" />
      <Skeleton className="h-6 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
      <div className="flex justify-between pt-4">
        <Skeleton className="h-10 w-[100px]" />
        <Skeleton className="h-10 w-[100px]" />
      </div>
    </div>
  )
}

