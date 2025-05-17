import { mutationFn } from "@/app/utils/axios";

interface AddAgreementType {
  agreement: string;
}
export const addAgreementApi = {
  mutationFn: (body: AddAgreementType) => {
    return mutationFn("agreements", "POST", body);
  },
};
