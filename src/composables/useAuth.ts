import { computed, watch } from "vue";
import jwtDecode from "jwt-decode";
import { useRouter } from "vue-router";
import { useMutation, useQueryClient } from "vue-query";

import { login } from "@/api/base";
import { useAuthStore } from "@/stores";
import { useUtil, useLocalStorage } from ".";
import type { IRoles, IUser, LoginInput } from "@/interfaces";

export const useAuth = () => {
  const util = useUtil();
  const router = useRouter();
  const store = useAuthStore();
  const storage = useLocalStorage();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    (params: LoginInput) => login(params),
    {
      onSuccess(data) {
        // @ts-ignore
        const { token, full_name:fullName, username } = data;
        const decoded: any = jwtDecode(token);
        queryClient.getQueryCache().clear();
        storage.setItemFn({ key: "token", value: token });
        storage.setItemFn({ key: "persona", value: { fullName, username } });
        store.setDataUserLogin(token, { fullName, username }, { roles: decoded.roles, perfil: decoded.perfil, modulos: decoded.modulos  });
        router.replace({
          name: "home",
        });
      },
    }
  );

  watch(isLoading, (newValue) => {
    util.setLoading(newValue);
  });

  const loginFn = async (params: LoginInput) => {
    await mutate(params);
  };

  return {
    // state
    people: computed(() => store.persona),
    isAdmin: computed(() => true),
    isLoading: computed(() => isLoading.value),
    roles: computed(() => store.configuration?.roles ),
    perfil: computed(() => store.configuration?.perfil),
    modulos: computed(() => store.configuration?.modulos),
    
    // functions
    loginFn,
    setData(token: string, user: IUser, IRoles: IRoles) {
      store.setDataUserLogin(token, user, IRoles);
    },
    logout: () => {
      store.getLogout();
      storage.removeAll();
      queryClient.getQueryCache().clear();
    },
  };
};
