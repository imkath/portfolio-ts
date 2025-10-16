import { describe, expect, it } from "@jest/globals";
import {
  generatePersonJsonLd,
  generateProjectJsonLd,
  generateOgImageUrl,
} from "../seo";
import type { Project } from "@/src/types";

describe("SEO Helpers", () => {
  describe("generatePersonJsonLd", () => {
    it("should generate valid Person schema", () => {
      const jsonLd = generatePersonJsonLd();

      expect(jsonLd["@context"]).toBe("https://schema.org");
      expect(jsonLd["@type"]).toBe("Person");
      expect(jsonLd.name).toBe("Tannia Silva");
      expect(jsonLd.jobTitle).toBe("Maquilladora Profesional");
      expect(jsonLd.address.addressCountry).toBe("CL");
      expect(jsonLd.knowsAbout).toContain("Maquillaje Editorial");
    });
  });

  describe("generateProjectJsonLd", () => {
    const mockProject: Project = {
      slug: "test-project",
      title: "Test Makeup Project",
      clientOrPublication: "Test Magazine",
      year: 2024,
      country: "Chile",
      categories: ["beauty", "editorial"],
      images: [
        {
          src: "https://example.com/image.jpg",
          width: 1200,
          height: 1600,
          alt: "Test image",
        },
      ],
      credits: [
        { role: "photography", name: "Test Photographer" },
        { role: "hair", name: "Test Hair Stylist" },
      ],
      aboutLook: "Test description of the look",
    };

    it("should generate valid CreativeWork schema", () => {
      const jsonLd = generateProjectJsonLd(mockProject);

      expect(jsonLd["@context"]).toBe("https://schema.org");
      expect(jsonLd["@type"]).toBe("CreativeWork");
      expect(jsonLd.name).toBe("Test Makeup Project");
      expect(jsonLd.description).toBe("Test description of the look");
    });

    it("should include creator information", () => {
      const jsonLd = generateProjectJsonLd(mockProject);

      expect(jsonLd.creator["@type"]).toBe("Person");
      expect(jsonLd.creator.name).toBe("Tannia Silva");
      expect(jsonLd.creator.jobTitle).toBe("Maquilladora Profesional");
    });

    it("should include contributors from credits", () => {
      const jsonLd = generateProjectJsonLd(mockProject);

      expect(jsonLd.contributor).toHaveLength(2);
      expect(jsonLd.contributor[0].name).toBe("Test Photographer");
      expect(jsonLd.contributor[0].roleName).toBe("Fotografía");
      expect(jsonLd.contributor[1].roleName).toBe("Cabello");
    });

    it("should include image metadata", () => {
      const jsonLd = generateProjectJsonLd(mockProject);

      expect(jsonLd.image).toBeDefined();
      expect(jsonLd.image?.["@type"]).toBe("ImageObject");
      expect(jsonLd.image?.url).toBe("https://example.com/image.jpg");
      expect(jsonLd.image?.width).toBe(1200);
      expect(jsonLd.image?.height).toBe(1600);
    });

    it("should include publication date from year", () => {
      const jsonLd = generateProjectJsonLd(mockProject);

      expect(jsonLd.datePublished).toBe("2024-01-01");
    });

    it("should include keywords from categories", () => {
      const jsonLd = generateProjectJsonLd(mockProject);

      expect(jsonLd.keywords).toBe("beauty, editorial");
    });

    it("should include publisher when clientOrPublication exists", () => {
      const jsonLd = generateProjectJsonLd(mockProject);

      expect(jsonLd.publisher).toBeDefined();
      expect(jsonLd.publisher?.["@type"]).toBe("Organization");
      expect(jsonLd.publisher?.name).toBe("Test Magazine");
    });
  });

  describe("generateOgImageUrl", () => {
    it("should add resize parameters for Vercel Storage URLs", () => {
      const vercelUrl =
        "https://example.public.blob.vercel-storage.com/image.jpg";
      const result = generateOgImageUrl(vercelUrl, 1200, 630);

      expect(result).toContain("w=1200");
      expect(result).toContain("h=630");
      expect(result).toContain("fit=cover");
    });

    it("should return original URL for non-Vercel URLs", () => {
      const regularUrl = "https://example.com/image.jpg";
      const result = generateOgImageUrl(regularUrl, 1200, 630);

      expect(result).toBe(regularUrl);
    });

    it("should use default dimensions when not provided", () => {
      const vercelUrl =
        "https://example.public.blob.vercel-storage.com/image.jpg";
      const result = generateOgImageUrl(vercelUrl);

      expect(result).toContain("w=1200");
      expect(result).toContain("h=630");
    });
  });
});
