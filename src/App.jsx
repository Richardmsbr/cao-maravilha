import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      {/* Header/Navigation */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <img src={logoEstrela} alt="Cão Maravilha" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h1 className="text-xl font-bold text-blue-800">Cão Maravilha</h1>
                <p className="text-sm text-gray-600">Clínica Veterinária</p>
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8">
              {[
                { id: 'home', label: 'Início' },
                { id: 'sobre', label: 'Sobre' },
                { id: 'servicos', label: 'Serviços' },
                { id: 'contato', label: 'Contato' }
              ].map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-gray-700 hover:bg-blue-100'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-blue-600 text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 py-4 border-t border-gray-200"
              >
                {[
                  { id: 'home', label: 'Início' },
                  { id: 'sobre', label: 'Sobre' },
                  { id: 'servicos', label: 'Serviços' },
                  { id: 'contato', label: 'Contato' }
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 10 }}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    {item.label}
                  </motion.button>
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
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-8">
              <motion.div variants={itemVariants}>
                <Badge className="mb-4 bg-yellow-100 text-yellow-800 border-yellow-300">
                  <Star className="w-4 h-4 mr-1" />
                  4,8 ⭐ - 338 avaliações no Google
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Cuidado <span className="text-blue-600">Especial</span> para seu{' '}
                  <span className="text-yellow-500">Pet</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Na Clínica Veterinária Cão Maravilha, oferecemos atendimento veterinário 
                  de excelência na zona norte de São Paulo, com amor e dedicação para 
                  garantir a saúde e bem-estar do seu melhor amigo.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => scrollToSection('contato')}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Agendar Consulta
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg rounded-full"
                  onClick={() => scrollToSection('servicos')}
                >
                  Nossos Serviços
                </Button>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                  Água Fria, São Paulo
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-blue-600" />
                  Seg-Sex: 9h-22h
                </div>
              </motion.div>
            </div>

            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="relative z-10"
              >
                <img 
                  src={clinicaInterior} 
                  alt="Interior da Clínica Cão Maravilha" 
                  className="w-full h-96 object-cover rounded-3xl shadow-2xl"
                />
              </motion.div>
              
              {/* Elementos decorativos flutuantes */}
              <motion.div
                variants={pulseVariants}
                animate="animate"
                className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full opacity-20 z-0"
              />
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-blue-400 rounded-full opacity-20 z-0"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Sobre a Clínica Cão Maravilha
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mais de uma década dedicada ao cuidado veterinário na zona norte de São Paulo
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img 
                src={clinicaExterior} 
                alt="Fachada da Clínica Cão Maravilha" 
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6 bg-blue-50 rounded-xl"
                >
                  <Heart className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900">Cuidado</h3>
                  <p className="text-sm text-gray-600">Com amor e dedicação</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6 bg-yellow-50 rounded-xl"
                >
                  <Award className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900">Excelência</h3>
                  <p className="text-sm text-gray-600">Atendimento de qualidade</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6 bg-green-50 rounded-xl"
                >
                  <Stethoscope className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900">Experiência</h3>
                  <p className="text-sm text-gray-600">Profissionais qualificados</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6 bg-purple-50 rounded-xl"
                >
                  <Shield className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900">Confiança</h3>
                  <p className="text-sm text-gray-600">Seu pet em boas mãos</p>
                </motion.div>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                Localizada na Rua Altinópolis, 42, no bairro Água Fria, nossa clínica 
                é referência em cuidados veterinários na zona norte de São Paulo. 
                Com uma equipe experiente e equipamentos modernos, oferecemos um 
                atendimento completo e humanizado para seu pet.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Serviços Section */}
      <section id="servicos" className="py-20 bg-gradient-to-br from-blue-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nossos Serviços
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cuidado completo para a saúde e bem-estar do seu pet
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Consultas Veterinárias",
                description: "Exames clínicos completos e diagnósticos precisos",
                icon: Stethoscope,
                color: "blue"
              },
              {
                title: "Vacinação",
                description: "Protocolo completo de vacinas para todas as idades",
                icon: Shield,
                color: "green"
              },
              {
                title: "Cirurgias",
                description: "Procedimentos cirúrgicos com equipamentos modernos",
                icon: Heart,
                color: "red"
              },
              {
                title: "Exames Laboratoriais",
                description: "Análises clínicas para diagnósticos precisos",
                icon: Award,
                color: "purple"
              },
              {
                title: "Emergências",
                description: "Atendimento de urgência para seu pet",
                icon: Phone,
                color: "orange"
              },
              {
                title: "Cuidados Preventivos",
                description: "Programas de prevenção e check-ups regulares",
                icon: Star,
                color: "yellow"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <Card className="h-full bg-white hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`w-16 h-16 mx-auto mb-6 rounded-full bg-${service.color}-100 flex items-center justify-center group-hover:bg-${service.color}-200 transition-colors`}
                    >
                      <service.icon className={`w-8 h-8 text-${service.color}-600`} />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contato Section */}
      <section id="contato" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Entre em Contato
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Estamos prontos para cuidar do seu pet. Agende sua consulta!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="grid gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start space-x-4 p-6 bg-blue-50 rounded-xl"
                >
                  <Phone className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Telefone</h3>
                    <p className="text-gray-600">(11) 2307-0680</p>
                    <p className="text-sm text-blue-600 mt-1">Ligue para agendar sua consulta</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start space-x-4 p-6 bg-green-50 rounded-xl"
                >
                  <MapPin className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Endereço</h3>
                    <p className="text-gray-600">R. Altinópolis, 42 - Água Fria</p>
                    <p className="text-gray-600">São Paulo - SP, 02334-000</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start space-x-4 p-6 bg-yellow-50 rounded-xl"
                >
                  <Clock className="w-6 h-6 text-yellow-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Horário de Funcionamento</h3>
                    <div className="space-y-1 text-gray-600">
                      <p>Segunda a Sexta: 09:00 - 22:00</p>
                      <p>Sábado: 09:00 - 16:00</p>
                      <p>Domingo: Fechado</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.open('tel:+551123070680', '_self')}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Ligar Agora: (11) 2307-0680
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white relative overflow-hidden">
                <motion.div
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full"
                />
                <motion.div
                  variants={pulseVariants}
                  animate="animate"
                  className="absolute bottom-4 left-4 w-16 h-16 bg-yellow-400/20 rounded-full"
                />
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6">Por que escolher a Cão Maravilha?</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span>4,8 estrelas no Google (338 avaliações)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Heart className="w-5 h-5 text-red-400" />
                      <span>Atendimento humanizado e carinhoso</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-green-400" />
                      <span>Equipamentos modernos e seguros</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="w-5 h-5 text-purple-400" />
                      <span>Profissionais experientes e qualificados</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-white/10 rounded-xl">
                    <p className="text-sm italic">
                      "Seu pet merece o melhor cuidado. Na Cão Maravilha, 
                      tratamos cada animal com o amor e atenção que ele merece."
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <img src={logoEstrela} alt="Cão Maravilha" className="w-10 h-10 rounded-full" />
                <div>
                  <h3 className="text-xl font-bold">Cão Maravilha</h3>
                  <p className="text-gray-400 text-sm">Clínica Veterinária</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Cuidando com amor e dedicação dos pets da zona norte de São Paulo há mais de uma década.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  (11) 2307-0680
                </p>
                <p className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  R. Altinópolis, 42 - Água Fria
                </p>
                <p className="ml-6">São Paulo - SP, 02334-000</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">Horários</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>Segunda a Sexta: 09:00 - 22:00</p>
                <p>Sábado: 09:00 - 16:00</p>
                <p>Domingo: Fechado</p>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-400">4,8 ⭐ (338 avaliações)</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
          >
            <p>&copy; 2024 Clínica Veterinária Cão Maravilha. Todos os direitos reservados.</p>
          </motion.div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => scrollToSection('home')}
        className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40 flex items-center justify-center"
      >
        <ChevronDown className="w-6 h-6 rotate-180" />
      </motion.button>
    </div>
  )
}

export default App

