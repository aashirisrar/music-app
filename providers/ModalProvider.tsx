"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/modal/AuthModal";
import SubsribeModal from "@/components/modal/SubsribeModal";
import UploadModal from "@/components/modal/UploadModal";
import { ProductWithPrice } from "@/types/route";

interface ModalProviderProps {
  products: ProductWithPrice[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({ products }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AuthModal />
      <UploadModal />
      <SubsribeModal products={products} />
    </>
  );
};

export default ModalProvider;
