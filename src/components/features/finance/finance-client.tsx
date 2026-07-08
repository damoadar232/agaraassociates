"use client";

import { memo, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { Invoice } from "@/types";
import type { Project } from "@/types";
import { PageHeader } from "@/components/templates/page-header";
import { StatCard } from "@/components/molecules/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IndianRupee, TrendingDown, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { COLORS } from "@/lib/constants";

const PAGE_SIZE = 10;

interface FinanceClientProps {
  projects: Project[];
  invoices: Invoice[];
}

export const FinanceClient = memo(function FinanceClient({ projects, invoices }: FinanceClientProps) {
  const [page, setPage] = useState(1);

  const totalRevenue = projects.reduce((s, p) => s + p.spent, 0);
  const totalProfit = projects.reduce((s, p) => s + p.profit, 0);
  const totalExpenses = totalRevenue - totalProfit;

  const budgetData = useMemo(
    () =>
      projects.slice(0, 6).map((p) => ({
        name: p.name.split(" ")[0],
        budget: p.budget / 100000,
        spent: p.spent / 100000,
        profit: p.profit / 100000,
      })),
    [projects],
  );

  const totalPages = Math.max(1, Math.ceil(invoices.length / PAGE_SIZE));
  const pagedInvoices = invoices.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <PageHeader title="Finance" description="Revenue, expenses, invoices, and budget analytics" />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Revenue" value={formatCurrency(totalRevenue)} icon={IndianRupee} trend={{ value: "+12% this quarter", positive: true }} />
        <StatCard title="Expenses" value={formatCurrency(totalExpenses)} icon={TrendingDown} />
        <StatCard title="Profit" value={formatCurrency(totalProfit)} icon={TrendingUp} trend={{ value: `${Math.round((totalProfit / totalRevenue) * 100)}% margin`, positive: true }} />
      </div>

      <Card className="card-hover">
        <CardHeader><CardTitle>Budget Analytics by Project</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetData}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.divider} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} label={{ value: "₹ Lakhs", angle: -90, position: "insideLeft" }} />
              <Tooltip formatter={(v) => `₹${Number(v ?? 0)}L`} />
              <Legend />
              <Bar dataKey="budget" fill={COLORS.accent} radius={[4, 4, 0, 0]} />
              <Bar dataKey="spent" fill={COLORS.info} radius={[4, 4, 0, 0]} />
              <Bar dataKey="profit" fill={COLORS.success} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Invoices</h2>
        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50 text-left">
                  <th className="p-3">Project</th>
                  <th className="p-3">Client</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Due Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {pagedInvoices.map((inv) => (
                  <tr key={inv.id} className="border-b hover:bg-muted/30">
                    <td className="p-3 font-medium">{inv.projectName}</td>
                    <td className="p-3">{inv.clientName}</td>
                    <td className="p-3">{formatCurrency(inv.amount)}</td>
                    <td className="p-3">{inv.dueDate}</td>
                    <td className="p-3">
                      <Badge variant={inv.status === "paid" ? "success" : inv.status === "overdue" ? "destructive" : "warning"}>
                        {inv.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
        {totalPages > 1 && (
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
            <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
            <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</Button>
          </div>
        )}
      </section>

      <Card className="card-hover">
        <CardHeader><CardTitle className="text-base">Pending Collections</CardTitle></CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{formatCurrency(invoices.filter((i) => i.status !== "paid").reduce((s, i) => s + i.amount, 0))}</p>
          <p className="text-sm text-muted-foreground">{invoices.filter((i) => i.status === "overdue").length} overdue invoices</p>
        </CardContent>
      </Card>
    </div>
  );
});
