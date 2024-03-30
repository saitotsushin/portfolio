export default {
  root: 'src', /* srcフォルダをルートとしたビルド対象 */
  base: '/portfolio/',
  publicDir: 'public',
  build: {
    outDir:"../dist", //プロジェクトルートからの相対パス(index.pugからの相対パス)
    emptyOutDir: true,
    rollupOptions: {
      //ここに設定を追加していく
    }
   }
}