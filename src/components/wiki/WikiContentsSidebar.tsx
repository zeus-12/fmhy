// import { Drawer, Loader } from "@mantine/core";
// import { useState } from "react";
// import { PanelRightOpen, X } from "lucide-react";
// interface WikiContentsSidebarProps {
//   category: string;
// }

// const WikiContentsSidebar: React.FC<WikiContentsSidebarProps> = ({
//   category,
// }) => {
//   const [opened, setOpened] = useState(false);
//   return (
//     <>
//       <PanelRightOpen
//         className="h-7 w-7 md:hidden absolute right-3 text-gray-500"
//         onClick={() => setOpened(true)}
//       />
//       <div className="hidden md:flex">
//         <WikiContentsSidebarData category={category} />
//       </div>

//       <Drawer
//         opened={opened}
//         className="bg-black md:hidden"
//         classNames={{
//           body: "mt-16 p-0",
//         }}
//         position="right"
//         size="sm"
//         onClose={() => setOpened(false)}
//         overlayProps={{
//           opacity: 0.55,
//           blur: 3,
//         }}
//         withCloseButton={false}
//         zIndex={20}
//       >
//         <WikiContentsSidebarData
//           category={category}
//           closeDrawer={() => setOpened(false)}
//           isDrawer={true}
//         />
//       </Drawer>
//     </>
//   );
// };

// interface WikiContentsSidebarDataProps extends WikiContentsSidebarProps {
//   isDrawer?: boolean;
//   closeDrawer?: () => void;
// }

// const WikiContentsSidebarData: React.FC<WikiContentsSidebarDataProps> = ({
//   category,
//   isDrawer,
//   closeDrawer,
// }) => {
//   return (
//     <div
//       className={`${
//         ["home"].includes(category) ? "hidden" : ""
//       } px-5 py-2 bg-[#0E131F] border-l-[1px] h-full w-full border-gray-700 md:flex-col overflow-scroll hideScrollbar min-w-[12rem]`}
//     >
//       <div className="flex items-center justify-between">
//         <p className="text-2xl tracking-tighter font-medium px-4">Contents</p>
//         {isDrawer && <X className="h-6 w-6" onClick={closeDrawer} />}
//       </div>
//       <div className="justify-center items-center flex h-[calc(100vh_-_6rem)]">
//         <Loader variant="dots" />
//       </div>
//     </div>
//   );
// };

// export default WikiContentsSidebar;
