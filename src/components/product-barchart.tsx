"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { category: "> 2 years", product: 186 },
  { category: "1-2 years", product: 305 },
  { category: "7-12 months", product: 237 },
  { category: "3-6 months", product: 73 },
  { category: "1-2 months", product: 73 },
  { category: "< 1 months", product: 73 }
]

const chartConfig = {
  product: {
    label: "Total Product",
    color: "#098af4",
  },
} satisfies ChartConfig

export function ProductBarchartContainer() {
  return (
    <div>
      <ChartContainer config={chartConfig} style={{width: "100%", height: "25vh"}}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="product" fill="var(--color-product)" radius={4} />
          </BarChart>
        </ChartContainer>
    </div>
    // <Card>
    //   <CardHeader>
    //     <CardTitle>Bar Chart - Multiple</CardTitle>
    //     <CardDescription>January - June 2024</CardDescription>
    //   </CardHeader>
    //   <CardContent>
    //     <ChartContainer config={chartConfig}>
    //       <BarChart accessibilityLayer data={chartData}>
    //         <CartesianGrid vertical={false} />
    //         <XAxis
    //           dataKey="category"
    //           tickLine={false}
    //           tickMargin={10}
    //           axisLine={false}
    //           tickFormatter={(value) => value.slice(0, 3)}
    //         />
    //         <ChartTooltip
    //           cursor={false}
    //           content={<ChartTooltipContent indicator="dashed" />}
    //         />
    //         <Bar dataKey="product" fill="var(--color-product)" radius={4} />
    //       </BarChart>
    //     </ChartContainer>
    //   </CardContent>
    //   {/* <CardFooter className="flex-col items-start gap-2 text-sm">
    //     <div className="flex gap-2 font-medium leading-none">
    //       Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
    //     </div>
    //     <div className="leading-none text-muted-foreground">
    //       Showing total visitors for the last 6 months
    //     </div>
    //   </CardFooter> */}
    // </Card>
  )
}
