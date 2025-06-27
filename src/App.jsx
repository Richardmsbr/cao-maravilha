import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Button 
} from '@/components/ui/button'
import { 
  Card, 
  CardContent 
} from '@/components/ui/card'
import { 
  Badge 
} from '@/components/ui/badge'
import {
  Phone,
  MapPin,
  Clock,
  Star,
  Heart,
  Stethoscope,
  Shield,
  Award,
  ChevronDown,
  Menu,
  X
} from 'lucide-react'
import './App.css'

// Importar as imagens
import clinicaInterior from './assets/2021-06-25.webp'
import logoEstrela from './assets/images(1).jpeg'
import clinicaExterior from './assets/unnamed.webp'
import logoAzul from './assets/images.jpeg'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Animação de scroll suave
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
    setIsMenuOpen(false)
  }

  // Detectar seção ativa no scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'sobre', 'servicos', 'contato']
      const scrollPosition = window.scrollY + 100
      
      sections.forEach(section => {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header/Navigation */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-lg z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={logoEstrela} alt="Cão Maravilha" className="w-12 h-12 rounded-full" />
              <div>
                <h1 className="text-xl font-bold text-blue-900">Cão Maravilha</h1>
                <p className="text-sm text-gray-600">Clínica Veterinária</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {[
                { id: 'home', label: 'Início' },
                { id: 'sobre', label: 'Sobre' },
                { id: 'servicos', label: 'Serviços' },
                { id: 'contato', label: 'Contato' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-blue-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 py-4 border-t"
              >
                {[
                  { id: 'home', label: 'Início' },
                  { id: 'sobre', label: 'Sobre' },
                  { id: 'servicos', label: 'Serviços' },
                  { id: 'contato', label: 'Contato' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg"
                  >
                    {item.label}
                  </button>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-12"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <Badge className="mb-4 bg-yellow-100 text-yellow-800 border-yellow-300">
                <Star className="w-4 h-4 mr-1" />
                4,8 ⭐ - 338 avaliações no Google
              </Badge>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Cuidado Especial para seu{' '}
              <span className="text-blue-600">Pet</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Na Clínica Veterinária Cão Maravilha, oferecemos atendimento veterinário de 
              excelência na zona norte de São Paulo, com amor e dedicação para garantir a 
              saúde e bem-estar do seu melhor amigo.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                size="lg" 
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3"
                onClick={() => window.open('tel:+551123070680')}
              >
                <Phone className="w-5 h-5 mr-2" />
                Agendar Consulta
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3"
                onClick={() => scrollToSection('servicos')}
              >
                Nossos Serviços
              </Button>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-600"
            >
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1 text-blue-600" />
                Água Fria, São Paulo
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1 text-blue-600" />
                Seg-Sex: 9h-22h
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            variants={itemVariants}
            className="relative max-w-4xl mx-auto"
          >
            <img 
              src={clinicaInterior} 
              alt="Interior da Clínica Cão Maravilha" 
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Sobre a Clínica Cão Maravilha
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Mais de uma década dedicada ao cuidado veterinário na zona norte de São Paulo
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  { icon: Heart, title: 'Com amor e dedicação' },
                  { icon: Stethoscope, title: 'Atendimento de qualidade' },
                  { icon: Shield, title: 'Profissionais qualificados' },
                  { icon: Award, title: 'Seu pet em boas mãos' }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-gray-700">{item.title}</span>
                  </motion.div>
                ))}
              </div>

              <p className="text-gray-600">
                Localizada na Rua Altinópolis, 42, no bairro Água Fria, nossa clínica é 
                referência em cuidados veterinários na zona norte de São Paulo. Com uma 
                equipe experiente e equipamentos modernos, oferecemos um atendimento 
                completo e humanizado para seu pet.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <img 
                src={clinicaExterior} 
                alt="Fachada da Clínica Cão Maravilha" 
                className="w-full h-80 object-cover rounded-2xl shadow-xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Nossos Serviços
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600"
            >
              Cuidado completo para a saúde e bem-estar do seu pet
            </motion.p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Stethoscope,
                title: 'Consultas Veterinárias',
                description: 'Exames clínicos completos e diagnósticos precisos'
              },
              {
                icon: Shield,
                title: 'Vacinação',
                description: 'Protocolo completo de vacinas para todas as idades'
              },
              {
                icon: Heart,
                title: 'Cirurgias',
                description: 'Procedimentos cirúrgicos com equipamentos modernos'
              }
            ].map((service, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <service.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-16 px-4 bg-blue-900 text-white">
        <div className="container mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Entre em Contato
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-blue-100"
            >
              Estamos prontos para cuidar do seu pet
            </motion.p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8 text-center"
          >
            <motion.div variants={itemVariants}>
              <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Telefone</h3>
              <p className="text-blue-100">(11) 2307-0680</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Endereço</h3>
              <p className="text-blue-100">
                R. Altinópolis, 42<br />
                Água Fria, São Paulo - SP<br />
                02334-000
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Horário</h3>
              <div className="text-blue-100 space-y-1">
                <p>Segunda a Sexta: 9h às 22h</p>
                <p>Sábado: 9h às 16h</p>
                <p>Domingo: Fechado</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="text-center mt-12"
          >
            <Button 
              size="lg" 
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3"
              onClick={() => window.open('tel:+551123070680')}
            >
              <Phone className="w-5 h-5 mr-2" />
              Ligar Agora
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src={logoEstrela} alt="Cão Maravilha" className="w-8 h-8 rounded-full" />
            <span className="text-lg font-semibold">Clínica Veterinária Cão Maravilha</span>
          </div>
          <p className="text-gray-400">
            © 2024 Clínica Veterinária Cão Maravilha. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App

