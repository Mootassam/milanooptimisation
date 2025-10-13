// vite.config.ts
import { defineConfig } from "file:///D:/end/graborders/node_modules/vite/dist/node/index.js";
import react from "file:///D:/end/graborders/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "D:\\end\\graborders";
var vite_config_default = defineConfig({
  plugins: [react()],
  // server:{host:"192.168.1.21",port:80},
  resolve: {
    alias: {
      "@component": path.resolve(__vite_injected_original_dirname, "src/component"),
      "@utils": path.resolve(__vite_injected_original_dirname, "src/utils"),
      "@data": path.resolve(__vite_injected_original_dirname, "src/data"),
      "src/config": path.resolve(__vite_injected_original_dirname, "src/config"),
      "src/shared": path.resolve(__vite_injected_original_dirname, "src/shared"),
      "src/view": path.resolve(__vite_injected_original_dirname, "src/view"),
      "src/modules": path.resolve(__vite_injected_original_dirname, "src/modules"),
      "src/security": path.resolve(__vite_injected_original_dirname, "src/security"),
      "@i18n": path.relative(__vite_injected_original_dirname, "../../i18n")
    }
  }
  // server: {
  //   host: "192.168.90.76",
  // },
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxlbmRcXFxcZ3JhYm9yZGVyc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcZW5kXFxcXGdyYWJvcmRlcnNcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2VuZC9ncmFib3JkZXJzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbcmVhY3QoKV0sXHJcbiAgLy8gc2VydmVyOntob3N0OlwiMTkyLjE2OC4xLjIxXCIscG9ydDo4MH0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgXCJAY29tcG9uZW50XCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2NvbXBvbmVudFwiKSxcclxuICAgICAgXCJAdXRpbHNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvdXRpbHNcIiksXHJcbiAgICAgIFwiQGRhdGFcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvZGF0YVwiKSxcclxuICAgICAgXCJzcmMvY29uZmlnXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2NvbmZpZ1wiKSxcclxuICAgICAgXCJzcmMvc2hhcmVkXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL3NoYXJlZFwiKSxcclxuICAgICAgXCJzcmMvdmlld1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyYy92aWV3XCIpLFxyXG4gICAgICBcInNyYy9tb2R1bGVzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL21vZHVsZXNcIiksXHJcbiAgICAgIFwic3JjL3NlY3VyaXR5XCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL3NlY3VyaXR5XCIpLFxyXG4gICAgICBcIkBpMThuXCI6IHBhdGgucmVsYXRpdmUoX19kaXJuYW1lLCBcIi4uLy4uL2kxOG5cIiksXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgLy8gc2VydmVyOiB7XHJcbiAgLy8gICBob3N0OiBcIjE5Mi4xNjguOTAuNzZcIixcclxuICAvLyB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyTyxTQUFTLG9CQUFvQjtBQUN4USxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBRmpCLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQTtBQUFBLEVBRWpCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLGNBQWMsS0FBSyxRQUFRLGtDQUFXLGVBQWU7QUFBQSxNQUNyRCxVQUFVLEtBQUssUUFBUSxrQ0FBVyxXQUFXO0FBQUEsTUFDN0MsU0FBUyxLQUFLLFFBQVEsa0NBQVcsVUFBVTtBQUFBLE1BQzNDLGNBQWMsS0FBSyxRQUFRLGtDQUFXLFlBQVk7QUFBQSxNQUNsRCxjQUFjLEtBQUssUUFBUSxrQ0FBVyxZQUFZO0FBQUEsTUFDbEQsWUFBWSxLQUFLLFFBQVEsa0NBQVcsVUFBVTtBQUFBLE1BQzlDLGVBQWUsS0FBSyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUNwRCxnQkFBZ0IsS0FBSyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUN0RCxTQUFTLEtBQUssU0FBUyxrQ0FBVyxZQUFZO0FBQUEsSUFDaEQ7QUFBQSxFQUNGO0FBQUE7QUFBQTtBQUFBO0FBSUYsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
