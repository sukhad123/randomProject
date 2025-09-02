"use client";
import { Card, CardHeader, CardBody, Image, CardFooter } from "@heroui/react";
import { Button } from "@heroui/button";
import { Progress } from "@heroui/react";

export default function CardComponent({
  title,
  value,
 progress,
  setValue,
}: {
  title: string;
  value: boolean | null;
  progress:number,
  setValue: (val: boolean) => void;
}) {
  return (
    <Card className="py-4  ">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{title}</p>
        <Progress aria-label="Loading..." size="lg" value={progress}  />
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        {/* <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://heroui.com/images/hero-card-complete.jpeg"
          width={270}
        /> */}
      </CardBody>
      <CardFooter>
        <section className="flex w-full justify-center gap-4">
          <Button
            color="success"
            
            onPress={() => setValue(true)}
          >
            Yes
          </Button>
          <Button
            color="danger"
       
            onPress={() => setValue(false)}
          >
            No
          </Button>
        </section>
      </CardFooter>
    </Card>
  );
}
