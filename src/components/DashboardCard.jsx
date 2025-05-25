import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "./ui/card";
const DashboardCard = ({
  heading,
  headingCount,
  icon,
  iconColor,
 
 
}) => {
  const Icon = icon;
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {heading}: {headingCount}
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        {icon && <Icon className={`w-10 h-10 ${iconColor}`} />}
      </CardContent>
      <CardFooter>
       
      </CardFooter>
    </Card>
  );
};

export default DashboardCard;