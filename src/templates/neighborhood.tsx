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
import RTF from "../components/RTF";
import Cuisines from "../components/cuisines";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "neighborhood",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "c_headerImage",
      "c_footerImage",
      "c_sEOPageDescription",
      "slug",
      "c_bannerImage",
      "c_cuisines",
      "c_restaurants.name",
      "c_restaurants.logo",
      "c_restaurants.c_cuisine.name",
      "c_restaurants.menuUrl",
      "c_restaurantSectionHeader",
      "c_cuisineSectionHeader",
      "c_cuisine.name",
      "c_cuisine.slug",
      "c_pageTitle",
      "c_localCuisinePage.name",
      "c_localCuisinePage.slug",
      "c_localCuisinePage.c_cuisines",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["ce_neighborhood"],
      entityIds: ["1645965854834166472"],
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

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Neighborhood: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    _site,
    name,
    c_sEOPageDescription,
    c_bannerImage,
    c_cuisines,
    c_restaurants,
    c_restaurantSectionHeader,
    c_cuisineSectionHeader,
    c_headerImage,
    c_cuisine,
    c_footerImage,
    c_pageTitle,
    c_localCuisinePage,
  } = document;
  console.log(c_localCuisinePage);

  return (
    <>
      <Image image={c_headerImage} className="!max-w-full  " />
      <div className="centered-container py-8">
        <div className="section space-y-4">
          <div className="flex flex-row p-4 bg-white">
            <div className="w-3/5 my-auto">
              <h1 className="text-3xl font-bold mb-8">{c_pageTitle}</h1>
              <RTF>{c_sEOPageDescription}</RTF>
            </div>
            <div className="!w-2/5 my-auto">
              <Image image={c_bannerImage}></Image>
            </div>
          </div>
        </div>
        <Cuisines
          cuisine={c_localCuisinePage}
          title={c_cuisineSectionHeader}
        ></Cuisines>
        <div className="space-y-4 bg-white mt-16 py-8 ">
          <p className="text-3xl font-bold text-center">
            {c_restaurantSectionHeader}
          </p>
          <Carousel data={c_restaurants}></Carousel>
          <div
            className="border w-fit mx-auto px-4 py-2 text-center my-6 hover:cursor-pointer hover:bg-black hover:text-white"
            style={{ background: "#faf5ee" }}
          >
            <a href="https://www.wonder.com/restaurants">
              View All Restaurants
            </a>
          </div>
        </div>
      </div>
      <Image image={c_footerImage} className="!max-w-full  " />
    </>
  );
};

export default Neighborhood;
