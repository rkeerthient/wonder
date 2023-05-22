/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import * as React from "react";
import PageLayout from "../components/page-layout";
import "../index.css";
import { Image } from "@yext/pages/components";
import Carousel from "../components/Carousel";
import HoursText from "../components/HoursText";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "local-cuisine",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "c_sEOLocalCuisinePageDescription",
      "slug",
      "c_bannerImage",
      "c_headerImage",
      "c_footerImage",
      "c_cuisines",
      "c_restaurants.name",
      "c_restaurants.logo",
      "c_restaurants.c_cuisine.name",
      "c_restaurants.priceRange",
      "c_restaurants.address",
      "c_restaurants.description",
      "c_restaurants.hours",
      "c_restaurants.pickupAndDeliveryServices",
      "c_restaurants.menuUrl",
      "c_restaurantSectionHeader",
      "c_cuisineSectionHeader",
      "c_cuisine.name",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["ce_localCuisinePage"],
      entityIds: ["1386601966200702126"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug
    ? document.slug
    : `${document.locale}/${document.address.region}/${document.address.city}/${
        document.address.line1
      }-${document.id.toString()}`;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
    ],
  };
};
export const PickupAndDeliveryServicesInt: any = {
  IN_STORE_PICKUP: "In-Store Pickup",
  CURBSIDE_PICKUP: "Curbside Pickup",
  PICKUP_NOT_OFFERED: "Pickup Not Offered",
  DELIVERY: "Delivery",
  SAME_DAY_DELIVERY: "Same Day Delivery",
  NO_CONTACT_DELIVERY: "No-Contact Delivery",
  DELIVERY_NOT_OFFERED: "Delivery Not Offered",
};
export const PriceRange: any = {
  UNSPECIFIED: "Unspecified",
  ONE: "$",
  TWO: "$$",
  THREE: "$$$",
  FOUR: "$$$$",
};
/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const LocalCuisine: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    _site,
    name,
    c_sEOLocalCuisinePageDescription,
    c_bannerImage,
    c_cuisine,
    c_restaurants,
    c_restaurantSectionHeader,
    c_cuisineSectionHeader,
    c_headerImage,
    c_footerImage,
  } = document;

  return (
    <>
      <Image image={c_headerImage} />
      <div className="centered-container">
        <div className="section space-y-4">
          <h1 className="text-3xl font-bold">{name}</h1>
          <div className="flex flex-row p-4 bg-white">
            <div className="w-3/5 my-auto">
              {c_sEOLocalCuisinePageDescription}
            </div>
            <div className="!w-2/5">
              <Image image={c_bannerImage}></Image>
            </div>
          </div>
        </div>

        <div className="space-y-4 ">
          <p className="text-3xl font-bold text-center">
            {c_restaurantSectionHeader}
          </p>
          <div className="flex flex-col space-y-4">
            {c_restaurants.map((item: any, index: any) => (
              <div
                key={index}
                className="flex flex-row gap-4 bg-white p-20 items-center"
              >
                <Image image={item.logo} className="w-44"></Image>
                <div className="flex flex-col space-y-6 text-sm">
                  <div className="flex flex-col !space-y-2">
                    <div className="font-bold text-xl">{item.name}</div>{" "}
                    <div>
                      {item.address.line1}, {item.address.city},{" "}
                      {item.address.region} {item.address.postalCode} |{" "}
                      {PriceRange[item.priceRange]}
                    </div>
                    <div className="flex flex-row gap-4 items-center">
                      <HoursText document={item}></HoursText>
                      <div className="w-max flex flex-row gap-1">
                        {item.pickupAndDeliveryServices.map(
                          (subItem: any, index: number) => (
                            <>
                              <span key={index}>
                                {PickupAndDeliveryServicesInt[subItem]}
                              </span>
                              {index !=
                                item.pickupAndDeliveryServices.length - 1 && (
                                <div>{" | "}</div>
                              )}
                            </>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <div>{item.description}</div>
                  <a
                    href={item.menuUrl}
                    className="p-4 w-fit border bg-black text-white hover:border hover:border-black hover:bg-white hover:text-black"
                  >
                    View menu
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 pb-16">
          <p className="text-3xl font-bold text-center mt-12">
            {c_cuisineSectionHeader}
          </p>
          <div className="grid grid-cols-4 gap-6">
            {c_cuisine.map((item: any, index: any) => (
              <div className="p-4 border border-black" key={index}>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Image image={c_footerImage} />
    </>
  );
};

export default LocalCuisine;
