export type TCategory = {
  id: string;
  catName: string;
};

export type TPost = {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  publicId?: string;
  catName?: string;
  links: null | string[];
  createdAt: string;
  authorEmail: string;
  author: {
    name: string;
  };
};

export type TComment={
  id: string;
   postId: string;
   content: string;
   user: {
      name: string | null; 
   };
   createdAt: Date;
   updatedAt: Date;
}