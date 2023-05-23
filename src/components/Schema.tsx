import * as React from "react";
import { JsonLd } from "react-schemaorg";
import {
  ClothingStore,
  Restaurant,
  FAQPage,
  Place,
  ItemList,
} from "schema-dts";
import { PriceRange } from "../templates/local-cuisine";
const Schema = (props: any) => {
  const { document } = props;
  const name = `${document.name}`;
  const description = document.decription;
  const itemListElement: any = [];

  if (document.c_restaurants) {
    document.c_restaurants.map((item: any) =>
      itemListElement.push({
        address: {
          "@type": "PostalAddress",
          addressLocality: item.address.city,
          addressRegion: item.address.region,
          postalCode: item.address.postalCode,
          streetAddress: item.address.line1,
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4",
          reviewCount: "250",
        },
        name: item.name,
        openingHours: document.hours
          ? buildHoursSchema(item.hours)
          : "Mo,Tu,We,Th 09:00-12:00",
        priceRange: PriceRange[item.priceRange],
        telephone: item.mainPhone,
      })
    );
  }

  return (
    <>
      <JsonLd<Place>
        item={{
          "@context": "https://schema.org",
          "@type": "Place",
          name,
          description,
        }}
      />
      <JsonLd<ItemList>
        item={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: itemListElement,
        }}
      />
    </>
  );
};

const buildHoursSchema = (hoursData: any) => {
  const nHrs: any = [];
  Object.keys(hoursData).forEach((item) =>
    nHrs.push(
      hoursData[item].openIntervals &&
        `${item.substring(0, 2).replace(/./, (c) => c.toUpperCase())} ${
          hoursData[item].openIntervals[0].start
        }-${hoursData[item].openIntervals[0].end}`
    )
  );
  return nHrs;
};

export default Schema;
