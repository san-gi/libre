<?php

namespace App\Controller;

use App\Entity\Chapitre;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class BlogController extends AbstractController
{
    /**
     * @Route("/blog", name="blog")
     */
    public function index()
    {
        $chap = $this->getDoctrine()->getRepository(Chapitre::class);
        $chapitres = $chap->findAll();
        return $this->render('blog/blog.html.twig', [
            'controller_name' => 'BlogController',
            'chapitres' => $chapitres,
        ]);
    }
     /**
     * @Route("/live", name="live")
     */
    public function live()
    {
        return $this->render('blog/live.html.twig', [
            'controller_name' => 'LiveController',
        ]);
    }
     /**
     * @Route("/voyageurs", name="voyageurs")
     */
    public function voyageurs()
    {
        return $this->render('blog/voyageurs.html.twig', [
            'controller_name' => 'LiveController',
        ]);
    }
}
