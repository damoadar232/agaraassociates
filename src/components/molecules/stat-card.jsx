import { Card, CardContent } from "@/components/ui/card";
import "@/assets/styles/components/StatCard.scss";

export function StatCard({ title, value, subtitle, icon: Icon, trend, className }) {
  const rootClassName = ["stat-card", className].filter(Boolean).join(" ");

  return (
    <Card className={rootClassName}>
      <CardContent className="stat-card__content">
        <div className="stat-card__body">
          <div className="stat-card__text">
            <p className="stat-card__title">{title}</p>
            <p className="stat-card__value">{value}</p>
            {subtitle && <p className="stat-card__subtitle">{subtitle}</p>}
            {trend && (
              <p
                className={`stat-card__trend${
                  trend.positive
                    ? " stat-card__trend--positive"
                    : " stat-card__trend--negative"
                }`}
              >
                {trend.value}
              </p>
            )}
          </div>
          {Icon && (
            <div className="stat-card__icon-wrap">
              <Icon className="stat-card__icon" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
