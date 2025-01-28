import { Sidebar as FlowbiteSidebar } from "flowbite-react";
import { BookOpenIcon, CogIcon, UserIcon, UsersIcon, Bars2Icon, ClipboardDocumentListIcon, CalendarIcon, ChartBarIcon, DocumentTextIcon, BuildingOfficeIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import { ChartPieIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const Sidebar = ({ isOpen}: SidebarProps) => {
  isOpen
    ? document.body.classList.add("overflow-hidden")
    : document.body.classList.remove("overflow-hidden");

  return (
    <aside
      id="logo-sidebar"
      className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white transition-transform dark:border-gray-700 dark:bg-gray-800 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } sm:translate-x-0`}
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-white dark:bg-gray-800">
        <FlowbiteSidebar>
          <FlowbiteSidebar.Items className="pt-20">
            <FlowbiteSidebar.ItemGroup>
              <FlowbiteSidebar.Item as={Link} to="/dashboard" icon={ChartPieIcon}>
                Área personal
              </FlowbiteSidebar.Item>
              <FlowbiteSidebar.Item as={Link} to="/dashboard/perfil-institucion" icon={BuildingOfficeIcon}>
                Perfil de la Institución
              </FlowbiteSidebar.Item>
            </FlowbiteSidebar.ItemGroup>
            <FlowbiteSidebar.ItemGroup title="Secretaria">
              <FlowbiteSidebar.Item as={Link} to="/dashboard/licencias" icon={CreditCardIcon}>
                Tipos de licencias
              </FlowbiteSidebar.Item>
              <FlowbiteSidebar.Item href="/periodos" icon={CalendarIcon}>
                Periodos académicos
              </FlowbiteSidebar.Item>
              <FlowbiteSidebar.Collapse icon={UsersIcon} label="Gestión de personas">
                <FlowbiteSidebar.Item href="/usuarios">Usuarios del sistema</FlowbiteSidebar.Item>
                <FlowbiteSidebar.Item href="/estudiantes">Estudiantes</FlowbiteSidebar.Item>
                <FlowbiteSidebar.Item href="/profesores">Docentes</FlowbiteSidebar.Item>
              </FlowbiteSidebar.Collapse>
              <FlowbiteSidebar.Item href="/courses" icon={BookOpenIcon}>
                Cursos
              </FlowbiteSidebar.Item>
              <FlowbiteSidebar.Item
                href="/attendance"
                icon={ClipboardDocumentListIcon}
              >
                Asistencia
              </FlowbiteSidebar.Item>
              <FlowbiteSidebar.Item href="/schedule" icon={CalendarIcon}>
                Horarios
              </FlowbiteSidebar.Item>
              <FlowbiteSidebar.Item href="/grades" icon={ChartBarIcon}>
                Calificaciones
              </FlowbiteSidebar.Item>
              <FlowbiteSidebar.Item href="/exams" icon={DocumentTextIcon}>
                Exámenes
              </FlowbiteSidebar.Item>
            </FlowbiteSidebar.ItemGroup>
            <FlowbiteSidebar.ItemGroup title="Administración">
              <FlowbiteSidebar.Item href="/profile" icon={UserIcon}>
                Perfil
              </FlowbiteSidebar.Item>
              <FlowbiteSidebar.Item href="/settings" icon={CogIcon}>
                Configuración
              </FlowbiteSidebar.Item>
              <FlowbiteSidebar.Item href="/logout" icon={Bars2Icon}>
                Cerrar Sesión
              </FlowbiteSidebar.Item>
            </FlowbiteSidebar.ItemGroup>
          </FlowbiteSidebar.Items>
        </FlowbiteSidebar>
      </div>
    </aside>
  );
};

export default Sidebar;
