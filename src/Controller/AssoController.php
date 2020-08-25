<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class AssoController extends AbstractController
{
    /**
     * @Route("/Association", name="asso")
     */
    public function index()
    {
        return $this->render('asso/asso.html.twig', [
            'controller_name' => 'AssoController',
        ]);
    }
    /**
     * @Route("/Projets", name="projets")
     */
    public function projet()
    {
        return $this->render('asso/projet.html.twig', [
            'controller_name' => 'AssoController',
        ]);
    }
     /**
     * @Route("/Philosophie", name="philo")
     */
    public function philo()
    {
        return $this->render('asso/philo.html.twig', [
            'controller_name' => 'AssoController',
        ]);
    }
      /**
     * @Route("/Finances", name="finance")
     */
    public function finance()
    {
        return $this->render('asso/Finance.html.twig', [
            'controller_name' => 'AssoController',
        ]);
    }
      /**
     * @Route("/NosErreurs", name="erreurs")
     */
    public function erreurs()
    {
        return $this->render('asso/erreurs.html.twig', [
            'controller_name' => 'AssoController',
        ]);
    }
}

