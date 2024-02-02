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
  id:string;
  postId:string;
  userEmail:string;
  content:string;
  user:{
    name:string;
  }
}