import prisma from "@/lib/prisma";

export const addBase64LinksToDb = async (
  data: { title: string; hash: string }[]
) => {
  await prisma?.base64.createMany({
    data: data.map((item: { title: string; hash: string }) => {
      return {
        title: item.title,
        hash: item.hash,
      };
    }),
  });
};

export const removeAllBase64LinksFromDb = async () => {
  await prisma.base64.deleteMany({});
};
