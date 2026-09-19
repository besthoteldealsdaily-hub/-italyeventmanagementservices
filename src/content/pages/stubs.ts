import type { PageStub } from "../types";

/**
 * PLANNED PAGES that are not live yet. Empty: all pages of the original plan are published.
 * To add a future page without publishing it, add a stub here; to publish it, add a full ContentPage
 * (in one of the files in this folder) with the same slug — it overrides the stub.
 */
export const stubs: PageStub[] = [];
