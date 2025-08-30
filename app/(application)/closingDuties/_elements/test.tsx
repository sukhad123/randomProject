"use client";
import { Card, CardHeader, CardBody } from "@heroui/react";

type ModelTemplateProps = {
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
};

export default function ModelTemplate({ header, body, footer }: ModelTemplateProps) {


  return (
     <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        {header}
      </CardHeader>
      <CardBody className="overflow-visible py-2 items-center">
        {body}
      </CardBody>
      
    </Card>
  );
}
